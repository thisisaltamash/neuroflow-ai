import nodemailer, { type Transporter } from "nodemailer";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";
import type { BookingPayload, ContactPayload, LeadPayload } from "@/types/domain";

let transporterCache: Transporter | null = null;

function getTransporter() {
  if (transporterCache) return transporterCache;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  transporterCache = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  return transporterCache;
}

function getFromEmail() {
  return process.env.FROM_EMAIL || process.env.SMTP_USER || CONTACT_EMAIL;
}

function getAdminNotificationEmail() {
  return process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || CONTACT_EMAIL;
}

function getBookingNotificationEmail() {
  return process.env.BOOKING_NOTIFICATION_EMAIL || "29altamashansari@gmail.com";
}

async function sendMail(params: { to: string; subject: string; html: string }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP credentials missing. Email skipped.");
    return;
  }

  await transporter.sendMail({
    from: getFromEmail(),
    to: params.to,
    subject: params.subject,
    html: params.html
  });
}

export async function sendLeadEmails(data: LeadPayload) {
  await Promise.allSettled([
    sendMail({
      to: getAdminNotificationEmail(),
      subject: `New Lead - ${data.name}`,
      html: `
        <h3>New Lead Captured</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Business Type:</strong> ${data.businessType}</p>
        <p><strong>Service:</strong> ${data.serviceInterested}</p>
        <p><strong>Source:</strong> ${data.source || "website"}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      `
    }),
    sendMail({
      to: data.email,
      subject: `${SITE_NAME}: We received your inquiry`,
      html: `
        <p>Hi ${data.name},</p>
        <p>Thanks for contacting <strong>${SITE_NAME}</strong>. Our team is reviewing your requirements and will contact you shortly.</p>
        <p>Requested service: <strong>${data.serviceInterested}</strong></p>
      `
    })
  ]);
}

export async function sendContactEmails(data: ContactPayload) {
  await Promise.allSettled([
    sendMail({
      to: getAdminNotificationEmail(),
      subject: `New Contact Inquiry - ${data.name}`,
      html: `
        <h3>Contact Form Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Service:</strong> ${data.serviceInterested}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      `
    }),
    sendMail({
      to: data.email,
      subject: `${SITE_NAME}: Inquiry confirmation`,
      html: `
        <p>Hi ${data.name},</p>
        <p>Your inquiry has been received by <strong>${SITE_NAME}</strong>. A specialist will get back to you with the next steps.</p>
      `
    })
  ]);
}

export async function sendBookingEmails(data: BookingPayload) {
  await Promise.allSettled([
    sendMail({
      to: getBookingNotificationEmail(),
      subject: `New Demo Booking - ${data.name}`,
      html: `
        <h3>New Demo Booking Request</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Business Type:</strong> ${data.businessType}</p>
        <p><strong>Purpose:</strong> ${data.meetingPurpose}</p>
        <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
        <p><strong>Notes:</strong><br/>${data.notes || "-"}</p>
      `
    }),
    sendMail({
      to: data.email,
      subject: `${SITE_NAME}: Demo booking confirmation`,
      html: `
        <p>Hi ${data.name},</p>
        <p>Thanks for booking a demo with <strong>${SITE_NAME}</strong>. Our team will confirm your meeting slot soon.</p>
        <p><strong>Requested slot:</strong> ${data.preferredDate} at ${data.preferredTime}</p>
      `
    })
  ]);
}
