"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./MotionPrimitives";
import { SOCIAL, CV } from "@/lib/links";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Client-side validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send. Please try again.");
    }
  }

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 px-6 section-divide"
    >
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-6 text-center font-mono">
            {"// CONTACT"}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-foreground mb-4 text-center">
            Get in <span className="text-accent">touch.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-base text-muted text-center mb-12 max-w-md mx-auto">
            Open to opportunities, collaborations, and conversations about
            engineering, aviation, and technology.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-surface border border-border rounded-xl p-8 md:p-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="block text-xs tracking-[0.12em] uppercase text-muted mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs tracking-[0.12em] uppercase text-muted mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs tracking-[0.12em] uppercase text-muted mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={status !== "sending" ? { scale: 1.01 } : {}}
                whileTap={status !== "sending" ? { scale: 0.99 } : {}}
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 rounded-lg bg-foreground text-white text-sm font-medium hover:bg-foreground/90 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </motion.button>

              {/* Feedback */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-accent text-center"
                  >
                    Message sent — I&apos;ll be in touch soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-red-500 text-center"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            {/* Links */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-border-light">
              <a
                href={SOCIAL.email}
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Email
              </a>
              <span className="w-px h-4 bg-border" />
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <span className="w-px h-4 bg-border" />
              <a
                href={CV.href}
                download={CV.downloadName}
                target="_blank"
                rel="noopener"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
