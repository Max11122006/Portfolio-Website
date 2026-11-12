"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { SOCIAL, CV } from "@/lib/links";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Feedback = { status: "idle" | "sending" | "success" | "error"; message?: string };

export default function Contact() {
  const [feedback, setFeedback] = useState<Feedback>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const message = String(fields.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setFeedback({ status: "error", message: "Please fill in all fields." });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setFeedback({ status: "error", message: "Please enter a valid email address." });
      return;
    }

    setFeedback({ status: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        const data = await response.json();
        setFeedback({ status: "error", message: data.error || "Something went wrong." });
        return;
      }

      form.reset();
      setFeedback({ status: "success", message: "Message sent. I’ll be in touch soon." });
    } catch {
      setFeedback({ status: "error", message: "Failed to send. Please try again." });
    }
  }

  return (
    <section id="contact" className="border-t border-border px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-12">
        <div>
          <h2 className="portfolio-heading">Get in touch</h2>
          <p className="mt-4 max-w-sm leading-relaxed text-muted">
            I’m open to internship opportunities in engineering and software.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a href={SOCIAL.email} className="portfolio-link">Email</a>
            <a href={SOCIAL.linkedin} className="portfolio-link">LinkedIn</a>
            <a href={CV.href} download={CV.downloadName} className="portfolio-link">Download CV</a>
          </div>
        </div>
        <form method="post" onSubmit={handleSubmit} className="grid gap-4 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">Name</label>
            <input id="contact-name" name="name" autoComplete="name" required className="portfolio-field" />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">Email</label>
            <input id="contact-email" type="email" name="email" autoComplete="email" required className="portfolio-field" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">Message</label>
            <textarea id="contact-message" rows={4} name="message" required className="portfolio-field" />
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={feedback.status === "sending"}
              className="portfolio-button portfolio-button-primary cursor-pointer disabled:cursor-wait disabled:opacity-65"
            >
              {feedback.status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p role="status" className={`text-sm ${feedback.status === "error" ? "text-red-700" : "text-accent"}`}>
              {feedback.message}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
