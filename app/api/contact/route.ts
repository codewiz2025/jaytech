import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  website?: string;
};

export async function POST(req: Request) {
  let b: Body;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success.
  if (b.website) return NextResponse.json({ ok: true });

  const name = (b.name ?? "").trim();
  const email = (b.email ?? "").trim();
  const message = (b.message ?? "").trim();

  if (
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { ok: false, error: "Please check the form fields and try again." },
      { status: 400 }
    );
  }

  const payload = {
    name,
    email,
    phone: (b.phone ?? "").trim(),
    service: (b.service ?? "").trim(),
    budget: (b.budget ?? "").trim(),
    message,
  };

  const resendKey = process.env.RESEND_API_KEY;
  const w3 = process.env.WEB3FORMS_ACCESS_KEY;
  const fs = process.env.FORMSPREE_ENDPOINT;

  try {
    if (resendKey) {
      const esc = (t: string) =>
        t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const to = process.env.CONTACT_TO_EMAIL || SITE.email;
      const from =
        process.env.CONTACT_FROM_EMAIL ||
        "JayTech Digitals <onboarding@resend.dev>";

      const rows = [
        ["Name", payload.name],
        ["Email", payload.email],
        ["Phone", payload.phone],
        ["Service", payload.service],
        ["Budget", payload.budget],
      ]
        .filter(([, v]) => v)
        .map(([k, v]) => `<p style="margin:0 0 8px"><b>${k}:</b> ${esc(v)}</p>`)
        .join("");

      // 1) Admin notification
      const adminRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `New JayTech enquiry: ${payload.service || "Project"} — ${name}`,
          html: `
            <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
              <h2 style="margin:0 0 16px;color:#0b3d91">New enquiry from the website</h2>
              ${rows}
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0"/>
              <p style="white-space:pre-wrap;margin:0;line-height:1.6">${esc(message)}</p>
            </div>
          `,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${payload.phone}\nService: ${payload.service}\nBudget: ${payload.budget}\n\n${message}`,
        }),
      });

      if (!adminRes.ok) {
        console.error("Resend admin error", adminRes.status, await adminRes.text().catch(() => ""));
        return NextResponse.json(
          { ok: false, error: "The email service rejected the submission." },
          { status: 502 }
        );
      }

      // 2) Customer confirmation (best-effort — do not fail the whole request if this fails)
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [email],
            subject: "We received your message — JayTech Digitals",
            html: `
              <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;line-height:1.6">
                <h2 style="margin:0 0 12px;color:#0b3d91">Thanks, ${esc(name)}!</h2>
                <p style="margin:0 0 16px">
                  Your message has been successfully delivered to <strong>JayTech Digitals</strong>.
                  We will get back to you shortly.
                </p>
                <div style="background:#f1f5f9;border-radius:12px;padding:16px 18px;margin:0 0 20px">
                  <p style="margin:0 0 6px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:.06em">Your enquiry</p>
                  <p style="margin:0 0 4px"><b>Service:</b> ${esc(payload.service || "General")}</p>
                  ${payload.budget ? `<p style="margin:0 0 4px"><b>Budget:</b> ${esc(payload.budget)}</p>` : ""}
                  <p style="margin:12px 0 0;white-space:pre-wrap">${esc(message)}</p>
                </div>
                <p style="margin:0;color:#64748b;font-size:14px">
                  Prefer a quicker reply? WhatsApp us on
                  <a href="${SITE.whatsapp}" style="color:#0b3d91">${SITE.phone}</a>
                  or email <a href="mailto:${SITE.email}" style="color:#0b3d91">${SITE.email}</a>.
                </p>
                <p style="margin:24px 0 0;font-size:13px;color:#94a3b8">— The JayTech Digitals team</p>
              </div>
            `,
            text: `Thanks, ${name}!\n\nYour message has been successfully delivered to JayTech Digitals. We will get back to you shortly.\n\nService: ${payload.service || "General"}\n${payload.budget ? `Budget: ${payload.budget}\n` : ""}\n${message}\n\n— The JayTech Digitals team\n${SITE.email} · ${SITE.phone}`,
          }),
        });
      } catch (confirmErr) {
        console.error("Resend confirmation error", confirmErr);
      }

      return NextResponse.json({ ok: true });
    }

    if (w3) {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: w3,
          subject: `New JayTech enquiry: ${payload.service || "Project"}`,
          from_name: "JayTech Website",
          replyto: email,
          ...payload,
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.success) return NextResponse.json({ ok: true });
      return NextResponse.json(
        { ok: false, error: "The message service rejected the submission." },
        { status: 502 }
      );
    }

    if (fs) {
      const r = await fetch(fs, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _replyto: email }),
      });
      if (r.ok) return NextResponse.json({ ok: true });
      return NextResponse.json(
        { ok: false, error: "The message service rejected the submission." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: `We couldn't reach the message service. Please email ${SITE.email}.`,
      },
      { status: 502 }
    );
  }

  // No handler configured: say so honestly instead of pretending it was delivered.
  return NextResponse.json({ ok: false, configured: false }, { status: 503 });
}
