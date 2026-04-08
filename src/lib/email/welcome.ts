import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? "GinnieTales <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    subject: "Welcome to GinnieTales!",
    html: `<p>Hi ${escapeHtml(name)},</p><p>Welcome to GinnieTales!</p>`,
    text: `Hi ${name},\n\nWelcome to GinnieTales!`,
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
