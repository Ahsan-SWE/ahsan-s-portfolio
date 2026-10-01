import nodemailer from "nodemailer";
import type { ContactInput } from "@/lib/contact-validation";
import { siteConfig } from "@/data/portfolio";

export function mailConfigured() {
  return Boolean(
    process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim(),
  );
}

export async function sendContactMail(input: ContactInput) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || "465");
  const localRelay = host === "127.0.0.1" || host === "localhost";
  const user = process.env.SMTP_USER!.trim();
  const recipient = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email;
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: !localRelay && port !== 465,
    auth: {
      user,
      pass:
        host === "smtp.gmail.com"
          ? process.env.SMTP_PASS!.replace(/\s/g, "")
          : process.env.SMTP_PASS!,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      from: { name: `${siteConfig.name} Website`, address: user },
      to: recipient,
      replyTo: { name: input.name, address: input.email },
      subject: `Portfolio inquiry: ${input.subject}`,
      text: [
        "New website inquiry",
        "",
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Service: ${input.service || "Not specified"}`,
        `Subject: ${input.subject}`,
        "",
        input.message,
        "",
        "The visitor agreed to use their details to respond to this inquiry.",
        "Use Reply to respond directly to the visitor.",
      ].join("\n"),
    });
    if (!result.accepted?.length || result.rejected?.length)
      throw new Error("The email provider did not accept the message.");
  } finally {
    transport.close();
  }
}
