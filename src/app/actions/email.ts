'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { resend } from '@/utils/resend';
import { WelcomeEmailTemplate } from '@/components/emails/WelcomeEmailTemplate';

interface WaitlistUser {
  id: number;
  created_at: string;
  email: string;
  name: string | null;
}

export async function sendWelcomeEmails(batchSize: number = 10) {
  try {
    const supabase = createAdminClient();
    
    // Fetch users from waitlist table
    const { data: users, error } = await supabase
      .from('waitlist')
      .select('id, created_at, email, name')
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch waitlist users: ${error.message}`);
    }

    if (!users || users.length === 0) {
      return { success: true, message: 'No users found in waitlist', sent: 0 };
    }

  let totalSent = 0;
  const errors: string[] = [];

    // Process users in batches to avoid rate limits
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      
      const emailPromises = batch.map(async (user: WaitlistUser) => {
        try {
          const result = await resend.emails.send({
            from: 'Rae Team <team@raeai.app>',
            to: [user.email],
            subject: 'Welcome to Rae - You\'re on the list!',
            html: WelcomeEmailTemplate({ name: user.name }),
          });

          if (result.error) {
            throw new Error(`Resend error: ${result.error.message}`);
          }

          return { success: true, email: user.email, id: result.data?.id };
        } catch (error) {
          const errorMessage = `Failed to send to ${user.email}: ${error instanceof Error ? error.message : 'Unknown error'}`;
          errors.push(errorMessage);
          return { success: false, email: user.email, error: errorMessage };
        }
      });

      const batchResults = await Promise.allSettled(emailPromises);
      
      batchResults.forEach((result) => {
        if (result.status === 'fulfilled' && result.value.success) {
          totalSent++;
        }
      });

      // Delay between batches to respect rate limits
      if (i + batchSize < users.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return {
      success: true,
      message: `Email campaign completed`,
      sent: totalSent,
      total: users.length,
      errors: errors.length > 0 ? errors : undefined
    };

  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      sent: 0
    };
  }
}

export async function sendSingleWelcomeEmail(email: string, name?: string | null) {
  try {
    const result = await resend.emails.send({
      from: 'Rae Team <team@raeai.app>',
      to: [email],
      subject: 'Welcome to Rae - You\'re on the list!',
      html: WelcomeEmailTemplate({ name }),
    });

    if (result.error) {
      throw new Error(`Resend error: ${result.error.message}`);
    }

    return { success: true, emailId: result.data?.id };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to send email');
  }
}
