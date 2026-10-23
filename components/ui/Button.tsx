"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

const sizes: Record<Size, string> = {
  sm: "h-11 px-3 text-[13px]",
  md: "h-12 px-5 text-sm",
};

function classes(variant: Variant, size: Size, className: string) {
  const base = `inline-flex w-full items-center justify-center rounded-[4px] font-medium tracking-[-0.01em] transition-colors duration-700 ease-forge sm:w-auto ${sizes[size]} ${className}`;
  if (variant === "primary") {
    return `${base} bg-accent text-white hover:bg-ink hover:text-bg`;
  }
  return `${base} border border-line bg-bg text-ink hover:border-ink`;
}

type LinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

type ActionProps = {
  href?: undefined;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export function Button(props: LinkProps | ActionProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const className = classes(variant, size, props.className ?? "");

  if ("href" in props && props.href) {
    const link = (
      <a href={props.href} className={className} onClick={props.onClick}>
        {props.children}
      </a>
    );
    return variant === "primary" ? <MagneticButton>{link}</MagneticButton> : link;
  }

  const action = props as ActionProps;
  const button = (
    <button type={action.type ?? "button"} className={className} disabled={action.disabled}>
      {action.children}
    </button>
  );

  if (variant === "primary" && !action.disabled) {
    return <MagneticButton>{button}</MagneticButton>;
  }

  return button;
}
