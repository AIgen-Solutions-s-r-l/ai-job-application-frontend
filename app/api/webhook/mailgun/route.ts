import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/libs/mailgun";
import config from "@/config";
import { z } from "zod";

// Validation schema for Mailgun webhook form data
const mailgunWebhookSchema = z.object({
  from: z.string().min(1, 'Sender is required').max(254, 'Sender too long'),
  subject: z.string().min(1, 'Subject is required').max(998, 'Subject too long'),
  bodyHtml: z.string().min(1, 'Email body is required').max(1000000, 'Email body too large'),
});

// This route is used to receive emails from Mailgun and forward them to our customer support email.
// See more: https://shipfa.st/docs/features/emails
export async function POST(req: NextRequest) {
  try {
    // extract the email content, subject and sender
    const formData = await req.formData();
    const rawSender = formData.get("From");
    const rawSubject = formData.get("Subject");
    const rawHtml = formData.get("body-html");

    // Validate the extracted data
    const result = mailgunWebhookSchema.safeParse({
      from: rawSender,
      subject: rawSubject,
      bodyHtml: rawHtml,
    });

    if (!result.success) {
      const errorDetails = 'error' in result ? result.error.flatten() : null;
      console.error("Mailgun webhook validation failed:", errorDetails);
      return NextResponse.json({ error: "Invalid webhook data" }, { status: 400 });
    }

    const { from: sender, subject, bodyHtml: html } = result.data;

    // send email to the admin if forwardRepliesTo is set
    if (config.mailgun.forwardRepliesTo) {
      await sendEmail({
        to: config.mailgun.forwardRepliesTo,
        subject: `${config?.appName} | ${subject}`,
        html: `<div><p><b>- Subject:</b> ${escapeHtml(subject)}</p><p><b>- From:</b> ${escapeHtml(sender)}</p><p><b>- Content:</b></p><div>${html}</div></div>`,
        replyTo: sender,
      });
    }

    return NextResponse.json({});
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("Mailgun webhook error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Helper to escape HTML in user-provided strings (except body which is expected to be HTML)
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
