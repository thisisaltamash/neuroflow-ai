import nodemailer from "nodemailer";

export async function sendLeadConfirmationEmail(to: string, name: string) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.FROM_EMAIL || user;

  if (!host || !user || !pass || !from) {
    console.warn("Email credentials are incomplete. Skipping confirmation email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  await transporter.sendMail({
    from,
    to,
    subject: "We received your NeuroFlow AI request",
    html: `<p>Hi ${name},</p><p>Thanks for contacting <strong>NeuroFlow AI</strong>. Our team will reach out soon with a personalized automation plan for your clinic.</p>`
  });
}
