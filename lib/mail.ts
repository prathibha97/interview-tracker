import { Resend } from 'resend';
import { formatDateTime } from './utils';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href=${confirmLink}>here</a> to confirm email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Reset Your password',
    html: `<p>Click <a href=${resetLink}>here</a> to reset your password.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export async function sendInterviewScheduleEmail({
  to,
  candidateName,
  interviewTitle,
  interviewDateTime,
  interviewerNames,
  location,
  notes,
}: {
  to: string;
  candidateName: string;
  interviewTitle: string;
  interviewDateTime: Date;
  interviewerNames: string[];
  location?: string;
  notes?: string;
}) {
  const formattedDateTime = formatDateTime(interviewDateTime);

  const interviewers = interviewerNames.join(', ');

  const subject = `Interview Scheduled: ${interviewTitle} with ${candidateName}`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
      <h2 style="color: #333;">Interview Scheduled</h2>
      <p>An interview has been scheduled:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Title:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${interviewTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Candidate:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${candidateName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Date and Time:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formattedDateTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Interviewer(s):</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${interviewers}</td>
        </tr>
        ${
          location
            ? `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Location:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${location}</td>
        </tr>
        `
            : ''
        }
      </table>
      
      ${
        notes
          ? `
      <h3 style="color: #555; font-size: 16px;">Additional Notes:</h3>
      <p style="background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${notes.replace(/\n/g, '<br>')}</p>
      `
          : ''
      }
      
      <p style="margin-top: 30px;">Please log in to the <a href="${process.env.APP_URL || 'https://yourapp.com'}">Interview Tracking System</a> for more details.</p>
      
      <div style="margin-top: 40px; color: #777; font-size: 12px;">
        <p>Best regards,<br>Interview Tracking System</p>
      </div>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        'Interview Tracking <no-reply@yourcompany.com>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Error sending email:', error);
      return false;
    }

    console.log(`Email sent to ${to}, ID: ${data?.id}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendFeedbackReminderEmail({
  to,
  interviewerName,
  candidateName,
  interviewTitle,
  interviewDateTime,
}: {
  to: string;
  interviewerName: string;
  candidateName: string;
  interviewTitle: string;
  interviewDateTime: Date;
}) {
  const formattedDateTime = formatDateTime(interviewDateTime);

  const subject = `Feedback Reminder: ${interviewTitle} with ${candidateName}`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
      <h2 style="color: #333;">Feedback Reminder</h2>
      <p>Hello ${interviewerName},</p>
      <p>This is a reminder to submit your feedback for the recent interview:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Title:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${interviewTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Candidate:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${candidateName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Date and Time:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formattedDateTime}</td>
        </tr>
      </table>
      
      <p>Please log in to the <a href="${process.env.APP_URL || 'https://yourapp.com'}/dashboard/interviews">Interview Tracking System</a> to submit your feedback.</p>
      
      <div style="margin-top: 40px; color: #777; font-size: 12px;">
        <p>Best regards,<br>Interview Tracking System</p>
      </div>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        'Interview Tracking <no-reply@yourcompany.com>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Error sending email:', error);
      return false;
    }

    console.log(`Email sent to ${to}, ID: ${data?.id}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}