import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

export type DethinkTheme = "light" | "dark" | "system";
export type DethinkDensity = "compact" | "default" | "comfortable";

export interface DethinkProviderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  theme?: DethinkTheme;
  density?: DethinkDensity;
  dir?: "ltr" | "rtl";
}

export function DethinkProvider({
  children,
  className,
  theme = "system",
  density = "default",
  dir = "ltr",
  ...props
}: DethinkProviderProps) {
  const resolvedTheme = theme === "system" ? undefined : theme;

  return (
    <div
      data-dethink-provider=""
      data-theme={resolvedTheme}
      data-density={density}
      dir={dir}
      className={cn("bg-background text-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}
