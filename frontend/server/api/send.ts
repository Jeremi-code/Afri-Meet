import { Resend } from 'resend';
const resend = new Resend(process.env.email_key)

export default defineEventHandler(async (event) => {
  try {
    const { to, subject, html } = await readBody(event)
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html,
    });

    return data;
  } catch (error) {
    return { error };
  }
});
