'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { sendSingleWelcomeEmail } from './email';

interface WaitlistData {
  email: string;
  name?: string;
}

export async function addToWaitlist(formData: WaitlistData) {
  // Input validation
  if (!formData.email?.trim()) {
    throw new Error('Email is required');
  }

  // Basic email validation [AFLL finally seems worth it]
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    throw new Error('Please enter a valid email address');
  }

  try {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: formData.email.toLowerCase().trim(),
          name: formData.name?.trim() || null,
        },
      ])
      .select('id');

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') { // PostgreSQL unique violation
        throw new Error('This email is already registered');
      }
      throw new Error('Failed to join waitlist');
    }

    // Send welcome email after successful database insertion
    try {
      await sendSingleWelcomeEmail(
        formData.email.toLowerCase().trim(),
        formData.name?.trim() || null
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