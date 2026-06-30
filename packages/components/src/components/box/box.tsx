import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  type ForwardedRef,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "../../utils/cn";

export type BoxElement =
  | "div"
  | "section"
  | "article"
  | "main"
  | "aside"
  | "nav"
  | "header"
  | "footer"
  | "ul"
  | "ol"
  | "li"
  | "span";

export type BoxDisplay =
  | "block"
  | "inline"
  | "inline-block"
  | "contents"
  | "flex"
  | "inline-flex"
  | "grid";

export type BoxSpacing =
  | "none"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "10"
  | "12";

export type BoxSurface =
  | "transparent"
  | "background"
  | "muted"
  | "primary"
  | "destructive"
  | "success"
  | "warning"
  | "info";

export type BoxBorder =
  | "none"
  | "default"
  | "muted"
  | "input"
  | "primary"
  | "destructive"
  | "success"
  | "warning"
  | "info";

export type BoxRadius = "none" | "sm" | "md" | "lg" | "full";
export type BoxOverflow = "visible" | "hidden" | "clip" | "auto";

type BoxBaseProps = {
  as?: BoxElement;
  asChild?: boolean;
  border?: BoxBorder;
  display?: BoxDisplay;
  gap?: BoxSpacing;
  m?: BoxSpacing;
  mb?: BoxSpacing;
  me?: BoxSpacing;
  ms?: BoxSpacing;
  mt?: BoxSpacing;
  mx?: BoxSpacing;
  my?: BoxSpacing;
  overflow?: BoxOverflow;
  p?: BoxSpacing;
  pb?: BoxSpacing;
  pe?: BoxSpacing;
  ps?: BoxSpacing;
  pt?: BoxSpacing;
  px?: BoxSpacing;
  py?: BoxSpacing;
  radius?: BoxRadius;
  surface?: BoxSurface;
};

type NativeBoxProps = HTMLAttributes<HTMLElement> &
  BoxBaseProps & {
    asChild?: false;
    children?: ReactNode;
  };

type ChildBoxProps = Omit<HTMLAttributes<HTMLElement>, "children"> &
  BoxBaseProps & {
    asChild: true;
    children: ReactElement<BoxSlotProps>;
  };

export type BoxProps = NativeBoxProps | ChildBoxProps;

type BoxSlotProps = Record<string, unknown> & {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  ref?: Ref<HTMLElement>;
};

type EventHandler = (...args: unknown[]) => void;

const boxBaseClasses = "box-border min-w-0";

const boxDisplayClasses: Record<BoxDisplay, string> = {
  block: "block",
  inline: "inline",
  "inline-block": "inline-block",
  contents: "contents",
  flex: "flex",
  "inline-flex": "inline-flex",
  grid: "grid",
};

const boxPaddingClasses: Record<
  "p" | "px" | "py" | "ps" | "pe" | "pt" | "pb",
  Record<BoxSpacing, string>
> = {
  p: {
    none: "p-0",
    1: "p-1",
    2: "p-2",
    3: "p-3",
    4: "p-4",
    5: "p-5",
    6: "p-6",
    8: "p-8",
    10: "p-10",
    12: "p-12",
  },
  px: {
    none: "px-0",
    1: "px-1",
    2: "px-2",
    3: "px-3",
    4: "px-4",
    5: "px-5",
    6: "px-6",
    8: "px-8",
    10: "px-10",
    12: "px-12",
  },
  py: {
    none: "py-0",
    1: "py-1",
    2: "py-2",
    3: "py-3",
    4: "py-4",
    5: "py-5",
    6: "py-6",
    8: "py-8",
    10: "py-10",
    12: "py-12",
  },
  ps: {
    none: "ps-0",
    1: "ps-1",
    2: "ps-2",
    3: "ps-3",
    4: "ps-4",
    5: "ps-5",
    6: "ps-6",
    8: "ps-8",
    10: "ps-10",
    12: "ps-12",
  },
  pe: {
    none: "pe-0",
    1: "pe-1",
    2: "pe-2",
    3: "pe-3",
    4: "pe-4",
    5: "pe-5",
    6: "pe-6",
    8: "pe-8",
    10: "pe-10",
    12: "pe-12",
  },
  pt: {
    none: "pt-0",
    1: "pt-1",
    2: "pt-2",
    3: "pt-3",
    4: "pt-4",
    5: "pt-5",
    6: "pt-6",
    8: "pt-8",
    10: "pt-10",
    12: "pt-12",
  },
  pb: {
    none: "pb-0",
    1: "pb-1",
    2: "pb-2",
    3: "pb-3",
    4: "pb-4",
    5: "pb-5",
    6: "pb-6",
    8: "pb-8",
    10: "pb-10",
    12: "pb-12",
  },
};

const boxMarginClasses: Record<
  "m" | "mx" | "my" | "ms" | "me" | "mt" | "mb",
  Record<BoxSpacing, string>
> = {
  m: {
    none: "m-0",
    1: "m-1",
    2: "m-2",
    3: "m-3",
    4: "m-4",
    5: "m-5",
    6: "m-6",
    8: "m-8",
    10: "m-10",
    12: "m-12",
  },
  mx: {
    none: "mx-0",
    1: "mx-1",
    2: "mx-2",
    3: "mx-3",
    4: "mx-4",
    5: "mx-5",
    6: "mx-6",
    8: "mx-8",
    10: "mx-10",
    12: "mx-12",
  },
  my: {
    none: "my-0",
    1: "my-1",
    2: "my-2",
    3: "my-3",
    4: "my-4",
    5: "my-5",
    6: "my-6",
    8: "my-8",
    10: "my-10",
    12: "my-12",
  },
  ms: {
    none: "ms-0",
    1: "ms-1",
    2: "ms-2",
    3: "ms-3",
    4: "ms-4",
    5: "ms-5",
    6: "ms-6",
    8: "ms-8",
    10: "ms-10",
    12: "ms-12",
  },
  me: {
    none: "me-0",
    1: "me-1",
    2: "me-2",
    3: "me-3",
    4: "me-4",
    5: "me-5",
    6: "me-6",
    8: "me-8",
    10: "me-10",
    12: "me-12",
  },
  mt: {
    none: "mt-0",
    1: "mt-1",
    2: "mt-2",
    3: "mt-3",
    4: "mt-4",
    5: "mt-5",
    6: "mt-6",
    8: "mt-8",
    10: "mt-10",
    12: "mt-12",
  },
  mb: {
    none: "mb-0",
    1: "mb-1",
    2: "mb-2",
    3: "mb-3",
    4: "mb-4",
    5: "mb-5",
    6: "mb-6",
    8: "mb-8",
    10: "mb-10",
    12: "mb-12",
  },
};

const boxGapClasses: Record<BoxSpacing, string> = {
  none: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

const boxSurfaceClasses: Record<BoxSurface, string> = {
  transparent: "bg-transparent",
  background: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  primary: "bg-primary text-primary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-info text-info-foreground",
};

const boxBorderClasses: Record<BoxBorder, string> = {
  none: "border-0",
  default: "border border-border",
  muted: "border border-muted",
  input: "border border-input",
  primary: "border border-primary",
  destructive: "border border-destructive",
  success: "border border-success",
  warning: "border border-warning",
  info: "border border-info",
};

const boxRadiusClasses: Record<BoxRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const boxOverflowClasses: Record<BoxOverflow, string> = {
  visible: "overflow-visible",
  hidden: "overflow-hidden",
  clip: "overflow-clip",
  auto: "overflow-auto",
};

export function boxClassNames({
  border = "none",
  className,
  display,
  gap,
  m,
  mb,
  me,
  ms,
  mt,
  mx,
  my,
  overflow,
  p,
  pb,
  pe,
  ps,
  pt,
  px,
  py,
  radius = "none",
  surface = "transparent",
}: Pick<
  BoxProps,
  | "border"
  | "className"
  | "display"
  | "gap"
  | "m"
  | "mb"
  | "me"
  | "ms"
  | "mt"
  | "mx"
  | "my"
  | "overflow"
  | "p"
  | "pb"
  | "pe"
  | "ps"
  | "pt"
  | "px"
  | "py"
  | "radius"
  | "surface"
> = {}) {
  return cn(
    boxBaseClasses,
    display ? boxDisplayClasses[display] : undefined,
    p ? boxPaddingClasses.p[p] : undefined,
    px ? boxPaddingClasses.px[px] : undefined,
    py ? boxPaddingClasses.py[py] : undefined,
    ps ? boxPaddingClasses.ps[ps] : undefined,
    pe ? boxPaddingClasses.pe[pe] : undefined,
    pt ? boxPaddingClasses.pt[pt] : undefined,
    pb ? boxPaddingClasses.pb[pb] : undefined,
    m ? boxMarginClasses.m[m] : undefined,
    mx ? boxMarginClasses.mx[mx] : undefined,
    my ? boxMarginClasses.my[my] : undefined,
    ms ? boxMarginClasses.ms[ms] : undefined,
    me ? boxMarginClasses.me[me] : undefined,
    mt ? boxMarginClasses.mt[mt] : undefined,
    mb ? boxMarginClasses.mb[mb] : undefined,
    gap ? boxGapClasses[gap] : undefined,
    boxSurfaceClasses[surface],
    boxBorderClasses[border],
    boxRadiusClasses[radius],
    overflow ? boxOverflowClasses[overflow] : undefined,
    className,
  );
}

function setRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") {
    ref(node);
    return;
  }

  if (ref) {
    ref.current = node;
  }
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  };
}

function getChildRef(child: ReactElement<BoxSlotProps>) {
  return child.props.ref;
}

function isEventHandler(key: string, value: unknown): value is EventHandler {
  return /^on[A-Z]/.test(key) && typeof value === "function";
}

function isDefaultPreventedEvent(event: unknown): event is { defaultPrevented: boolean } {
  return (
    typeof event === "object" &&
    event !== null &&
    "defaultPrevented" in event &&
    event.defaultPrevented === true
  );
}

function composeEventHandlers(
  componentHandler: EventHandler,
  childHandler: EventHandler,
): EventHandler {
  return (...args) => {
    componentHandler(...args);

    if (!isDefaultPreventedEvent(args[0])) {
      childHandler(...args);
    }
  };
}

function composeSlotProps(
  componentProps: Record<string, unknown>,
  childProps: BoxSlotProps,
) {
  const composedProps: BoxSlotProps = {
    ...componentProps,
    ...childProps,
  };

  for (const [key, componentValue] of Object.entries(componentProps)) {
    const childValue = childProps[key];

    if (isEventHandler(key, componentValue) && isEventHandler(key, childValue)) {
      composedProps[key] = composeEventHandlers(componentValue, childValue);
    }
  }

  return composedProps;
}

function getBoxDataAttributes({
  as,
  asChild,
  border,
  display,
  gap,
  m,
  mb,
  me,
  ms,
  mt,
  mx,
  my,
  overflow,
  p,
  pb,
  pe,
  ps,
  pt,
  px,
  py,
  radius,
  surface,
}: Pick<
  BoxProps,
  | "as"
  | "asChild"
  | "border"
  | "display"
  | "gap"
  | "m"
  | "mb"
  | "me"
  | "ms"
  | "mt"
  | "mx"
  | "my"
  | "overflow"
  | "p"
  | "pb"
  | "pe"
  | "ps"
  | "pt"
  | "px"
  | "py"
  | "radius"
  | "surface"
>) {
  return {
    "data-slot": "box",
    "data-as-child": asChild ? "true" : undefined,
    "data-element": asChild ? undefined : as,
    "data-display": display,
    "data-p": p,
    "data-px": px,
    "data-py": py,
    "data-ps": ps,
    "data-pe": pe,
    "data-pt": pt,
    "data-pb": pb,
    "data-m": m,
    "data-mx": mx,
    "data-my": my,
    "data-ms": ms,
    "data-me": me,
    "data-mt": mt,
    "data-mb": mb,
    "data-gap": gap,
    "data-surface": surface,
    "data-border": border,
    "data-radius": radius,
    "data-overflow": overflow,
  };
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as = "div",
      asChild = false,
      border = "none",
      children,
      className,
      display,
      gap,
      m,
      mb,
      me,
      ms,
      mt,
      mx,
      my,
      onClick,
      overflow,
      p,
      pb,
      pe,
      ps,
      pt,
      px,
      py,
      radius = "none",
      surface = "transparent",
      ...props
    },
    ref,
  ) => {
    const classes = boxClassNames({
      border,
      className,
      display,
      gap,
      m,
      mb,
      me,
      ms,
      mt,
      mx,
      my,
      overflow,
      p,
      pb,
      pe,
      ps,
      pt,
      px,
      py,
      radius,
      surface,
    });
    const dataAttributes = getBoxDataAttributes({
      as,
      asChild,
      border,
      display,
      gap,
      m,
      mb,
      me,
      ms,
      mt,
      mx,
      my,
      overflow,
      p,
      pb,
      pe,
      ps,
      pt,
      px,
      py,
      radius,
      surface,
    });

    if (asChild) {
      const child = Children.only(children);

      if (!isValidElement<BoxSlotProps>(child)) {
        throw new Error("Box with asChild expects a single React element child.");
      }

      const childRef = getChildRef(child);
      const composedProps = composeSlotProps(
        {
          ...props,
          ...(onClick ? { onClick } : {}),
        },
        child.props,
      );

      return cloneElement(child, {
        ...composedProps,
        ...dataAttributes,
        ref: composeRefs(ref as Ref<HTMLElement>, childRef),
        className: cn(classes, child.props.className),
      });
    }

    return createElement(
      as,
      {
        ...props,
        ...dataAttributes,
        ref: ref as ForwardedRef<HTMLElement>,
        className: classes,
        onClick,
      },
      children,
    );
  },
);

Box.displayName = "Box";
