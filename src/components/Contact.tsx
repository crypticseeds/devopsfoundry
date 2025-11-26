"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section
      id="contact"
      className="bg-secondary/5 py-24 relative overflow-hidden"
    >
      <div className="mx-auto max-w-xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Let&apos;s Talk</h2>
          <p className="text-secondary">
            Interested in working together? Have a question? Send me a message
            and I&apos;ll get back to you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-background/50 backdrop-blur-sm p-8 shadow-lg dark:border-white/5"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-4 rounded-full bg-green-500/10 p-3 text-green-500">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Message Sent!</h3>
                <p className="text-secondary">
                  Thanks for reaching out. I&apos;ll check my inbox and get back to
                  you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-sm font-medium text-accent-blue hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Name <span className="text-accent-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full rounded-lg border border-secondary/20 bg-background px-4 py-2.5 text-sm outline-none transition-all focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email <span className="text-accent-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full rounded-lg border border-secondary/20 bg-background px-4 py-2.5 text-sm outline-none transition-all focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                    placeholder="hello@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Message <span className="text-accent-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-secondary/20 bg-background px-4 py-2.5 text-sm outline-none transition-all focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
                    placeholder="Hello, how can I help you?"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-bold text-background transition-all hover:bg-foreground/90 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
