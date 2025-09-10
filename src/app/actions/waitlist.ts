
'use server';

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@supabase/supabase-js";
import { sendSingleWelcomeEmail } from "./email";

interface WaitlistData {
  email: string;
  name?: string;
}

export async function addToWaitlist(formData: WaitlistData) {
  // Input validation
  if (!formData.email?.trim()) {
    throw new Error('Email is required');
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    throw new Error('Please enter a valid email address');
  }

  try {
    const supabase = createAdminClient();
    // Create client for main project
    const supabaseMain = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_MAIN_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_MAIN_KEY!
    );

    // Prepare data
    const waitlistEntry = {
      email: formData.email.toLowerCase().trim(),
      name: formData.name?.trim() || null,
    };

    // Insert into default project
    const { data, error } = await supabase
      .from('waitlist')
      .insert([waitlistEntry])
      .select('id');

    // Insert into main project (no select needed)
    const { error: mainError } = await supabaseMain
      .from('waitlist')
      .insert([waitlistEntry]);

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        throw new Error('This email is already registered');
      }
      throw new Error('Failed to join waitlist');
    }
    if (mainError) {
      // Log but don't block user
      console.error('Failed to add to main waitlist:', mainError);
    }

    // Send welcome email after successful database insertion
    try {
      await sendSingleWelcomeEmail(
        waitlistEntry.email,
        waitlistEntry.name
      );
    } catch (emailError) {
      // Email failure doesn't break the signup process
      console.error('Failed to send welcome email:', emailError);
    }

    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}