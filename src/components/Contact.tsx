"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  website: string; // Honeypot field
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  general?: string;
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    website: "", // Honeypot - should remain empty
  });
  const [errors, setErrors] = React.useState<FormErrors>({});

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (
      formData.firstName.length < 2 ||
      formData.firstName.length > 50
    ) {
      newErrors.firstName = "First name must be between 2 and 50 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2 || formData.lastName.length > 50) {
      newErrors.lastName = "Last name must be between 2 and 50 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > 5000) {
      newErrors.message = "Message must be less than 5000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          message: formData.message.trim(),
          website: formData.website, // Honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setErrors({
            general: "Too many requests. Please wait a minute and try again.",
          });
        } else {
          setErrors({ general: data.error || "Failed to send message" });
        }
        return;
      }

      // Success - clear form and show success message
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        website: "",
      });
      setIsSuccess(true);
    } catch {
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      website: "",
    });
    setErrors({});
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
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Let&apos;s Talk
          </h2>
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
                  Thanks for reaching out. I&apos;ll check my inbox and get back
                  to you shortly.
                </p>
                <button
                  onClick={resetForm}
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
                {/* General error message */}
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500"
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{errors.general}</span>
                  </motion.div>
                )}

                {/* Honeypot field - hidden from users, visible to bots */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    opacity: 0,
                    height: 0,
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      First Name <span className="text-accent-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      maxLength={50}
                      className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
                        errors.firstName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-secondary/20 focus:border-accent-blue focus:ring-accent-blue/20"
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Last Name <span className="text-accent-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      maxLength={50}
                      className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
                        errors.lastName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-secondary/20 focus:border-accent-blue focus:ring-accent-blue/20"
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    maxLength={254}
                    className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-secondary/20 focus:border-accent-blue focus:ring-accent-blue/20"
                    }`}
                    placeholder="hello@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
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
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={5000}
                    rows={4}
                    className={`w-full resize-none rounded-lg border bg-background px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-secondary/20 focus:border-accent-blue focus:ring-accent-blue/20"
                    }`}
                    placeholder="Hello, how can I help you?"
                  />
                  <div className="mt-1 flex justify-between text-xs">
                    {errors.message ? (
                      <p className="text-red-500">{errors.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-secondary">
                      {formData.message.length}/5000
                    </span>
                  </div>
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
