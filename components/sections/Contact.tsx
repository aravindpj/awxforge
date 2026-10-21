"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";
import { DURATION, EASE } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const empty: ContactInput = { name: "", email: "", company: "", message: "" };

const fields: {
  name: keyof ContactInput;
  label: string;
  autoComplete: string;
  multiline?: boolean;
}[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", autoComplete: "email" },
  { name: "company", label: "Company", autoComplete: "organization" },
  {
    name: "message",
    label: "What’s the hardest part of your workflow?",
    autoComplete: "off",
    multiline: true,
  },
];

export function Contact() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const payload = (await response.json()) as { ok?: boolean; errors?: ContactErrors };
      if (!response.ok || !payload.ok) {
        setErrors(payload.errors ?? {});
        setFormError("Something went wrong. Try again.");
        return;
      }
      setSent(true);
    } catch {
      setFormError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Section id="contact" index="07" label="Contact" labelledBy="contact-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <h2
          id="contact-title"
          className="text-[clamp(32px,4vw,56px)] leading-[1.08] tracking-[-0.04em] lg:col-span-5"
        >
          Run a business with a workflow that fights you? Tell us about it.
        </h2>

        <div className="min-h-[420px] lg:col-span-6 lg:col-start-7">
          {sent ? (
            <motion.p
              role="status"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION, ease: EASE }}
              className="text-[clamp(28px,4vw,48px)] tracking-[-0.03em]"
            >
              Message received.
            </motion.p>
          ) : (
            <form onSubmit={onSubmit} noValidate aria-busy={pending} className="grid gap-6">
              {fields.map((field) => {
                const error = errors[field.name];
                const describedBy = error ? `${field.name}-error` : undefined;
                const shared =
                  "w-full rounded-[2px] border border-line bg-surface px-3 text-base text-ink";
                return (
                  <label key={field.name} className="grid gap-2" htmlFor={field.name}>
                    <span className="font-mono text-[11px] tracking-[0.08em] text-secondary uppercase">
                      {field.label}
                    </span>
                    {field.multiline ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={5}
                        value={values[field.name]}
                        autoComplete={field.autoComplete}
                        aria-invalid={Boolean(error)}
                        aria-describedby={describedBy}
                        onChange={(event) =>
                          setValues((current) => ({ ...current, [field.name]: event.target.value }))
                        }
                        className={`${shared} min-h-32 py-3`}
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.name === "email" ? "email" : "text"}
                        value={values[field.name]}
                        autoComplete={field.autoComplete}
                        aria-invalid={Boolean(error)}
                        aria-describedby={describedBy}
                        onChange={(event) =>
                          setValues((current) => ({ ...current, [field.name]: event.target.value }))
                        }
                        className={`${shared} h-12`}
                      />
                    )}
                    {error ? (
                      <span id={`${field.name}-error`} className="text-sm text-ink">
                        {error}
                      </span>
                    ) : null}
                  </label>
                );
              })}

              {formError ? (
                <p role="alert" className="text-sm text-ink">
                  {formError}
                </p>
              ) : null}

              <div>
                <Button type="submit" disabled={pending}>
                  {pending ? "Sending" : "Start the conversation"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
