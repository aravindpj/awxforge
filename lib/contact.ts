export type ContactInput = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactField = keyof ContactInput;

export type ContactErrors = Partial<Record<ContactField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const limits: Record<ContactField, number> = {
  name: 120,
  email: 200,
  company: 160,
  message: 4000,
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(
  input: unknown,
): { ok: true; data: ContactInput } | { ok: false; errors: ContactErrors } {
  if (!input || typeof input !== "object") {
    return { ok: false, errors: { message: "Invalid request." } };
  }

  const source = input as Record<string, unknown>;
  const data: ContactInput = {
    name: readString(source.name),
    email: readString(source.email),
    company: readString(source.company),
    message: readString(source.message),
  };

  const errors: ContactErrors = {};

  if (!data.name) errors.name = "Name is required.";
  else if (data.name.length > limits.name) errors.name = "Name is too long.";

  if (!data.email || !emailPattern.test(data.email)) {
    errors.email = "Enter a valid email.";
  } else if (data.email.length > limits.email) {
    errors.email = "Email is too long.";
  }

  if (!data.company) errors.company = "Company is required.";
  else if (data.company.length > limits.company) {
    errors.company = "Company is too long.";
  }

  if (data.message.length < 8) errors.message = "Tell us about the workflow.";
  else if (data.message.length > limits.message) {
    errors.message = "Message is too long.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}
