export const colors = {
  bg: "#FFFFFF",
  surface: "#FAFAFA",
  line: "#E8E8E8",
  ink: "#0A0A0A",
  secondary: "#5C5C5C",
  muted: "#9A9A9A",
  dim: "#D4D4D4",
  accent: "#722F7A",
} as const;

export const site = {
  name: "AWXFORGE",
  title: "AWXFORGE — Forging better ways to work",
  description:
    "Our mission is to simplify and automate the way businesses work, empowering people to spend less time navigating complexity and more time creating value.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://awxforge.com",
} as const;

export const sectionIndex = [
  { id: "problem", index: "01", label: "Problem" },
  { id: "belief", index: "02", label: "Belief" },
  { id: "introducing", index: "03", label: "Introducing" },
  { id: "philosophy", index: "04", label: "Philosophy" },
  { id: "method", index: "05", label: "Method" },
  { id: "mission", index: "06", label: "Mission" },
  { id: "contact", index: "07", label: "Contact" },
] as const;
