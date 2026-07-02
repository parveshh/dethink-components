import {
  Children,
  cloneElement,
  createContext,
  createElement,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ForwardedRef,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "../../utils/cn";

export type FieldElement = "div" | "section";
export type FieldOrientation = "vertical" | "horizontal";
export type FieldDescriptionElement = "p" | "div" | "span";
export type FieldErrorElement = "div" | "p";
export type FieldErrorItem =
  | string
  | {
      message?: ReactNode;
    }
  | null
  | undefined;

export interface FieldProps extends HTMLAttributes<HTMLElement> {
  as?: FieldElement;
  children?: ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  orientation?: FieldOrientation;
  readOnly?: boolean;
  required?: boolean;
}

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
  requiredMarker?: ReactNode | false;
}

export interface FieldControlProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  asChild?: boolean;
  children?: ReactElement<FieldControlSlotProps>;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

export interface FieldDescriptionProps extends HTMLAttributes<HTMLElement> {
  as?: FieldDescriptionElement;
  children?: ReactNode;
}

export interface FieldErrorProps extends HTMLAttributes<HTMLElement> {
  as?: FieldErrorElement;
  children?: ReactNode;
  errors?: FieldErrorItem[];
}

type FieldControlSlotProps = Record<string, unknown> & {
  "aria-describedby"?: string;
  "aria-errormessage"?: string;
  "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling";
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  readOnly?: boolean;
  ref?: Ref<HTMLElement>;
  required?: boolean;
};

type FieldContextValue = {
  controlId: string;
  descriptionIds: string[];
  disabled: boolean;
  errorIds: string[];
  invalid: boolean;
  orientation: FieldOrientation;
  readOnly: boolean;
  registerDescription: (id: string) => () => void;
  registerError: (id: string) => () => void;
  required: boolean;
};

const FieldContext = createContext<FieldContextValue | null>(null);

const fieldBaseClasses =
  "group/field grid min-w-0 gap-2 text-foreground data-[disabled=true]:opacity-60 data-[orientation=horizontal]:grid-cols-[minmax(0,1fr)_auto] data-[orientation=horizontal]:items-start data-[orientation=horizontal]:gap-x-density-gap data-[orientation=horizontal]:gap-y-1.5";

const fieldLabelBaseClasses =
  "text-sm font-medium leading-none text-foreground data-[disabled=true]:cursor-not-allowed data-[invalid=true]:text-destructive";

const fieldRequiredMarkerClasses = "ms-1 text-destructive";

const fieldControlBaseClasses =
  "min-w-0 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60 data-[invalid=true]:border-destructive data-[invalid=true]:ring-destructive/15";

const fieldDescriptionBaseClasses =
  "text-xs leading-5 text-muted-foreground data-[disabled=true]:opacity-70";

const fieldErrorBaseClasses = "text-xs font-medium leading-5 text-destructive";

function useFieldContext() {
  return useContext(FieldContext);
}

function addUniqueId(ids: string[], id: string) {
  if (ids.includes(id)) {
    return ids;
  }

  return [...ids, id];
}

function removeId(ids: string[], id: string) {
  return ids.filter((registeredId) => registeredId !== id);
}

function mergeIds(...values: Array<string | undefined>) {
  const ids = values
    .flatMap((value) => value?.split(/\s+/) ?? [])
    .map((value) => value.trim())
    .filter(Boolean);

  return Array.from(new Set(ids)).join(" ") || undefined;
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

function getChildRef(child: ReactElement<FieldControlSlotProps>) {
  return child.props.ref;
}

function getErrorMessage(error: FieldErrorItem) {
  if (!error) {
    return undefined;
  }

  if (typeof error === "string") {
    return error;
  }

  return error.message;
}

function useRegisteredId({
  id,
  register,
  shouldRegister,
}: {
  id: string;
  register: ((id: string) => () => void) | undefined;
  shouldRegister: boolean;
}) {
  useEffect(() => {
    if (!register || !shouldRegister) {
      return undefined;
    }

    return register(id);
  }, [id, register, shouldRegister]);
}

export function fieldClassNames({
  className,
}: Pick<FieldProps, "className"> = {}) {
  return cn(fieldBaseClasses, className);
}

export function fieldLabelClassNames({
  className,
}: Pick<FieldLabelProps, "className"> = {}) {
  return cn(fieldLabelBaseClasses, className);
}

export function fieldControlClassNames({
  className,
}: Pick<FieldControlProps, "className"> = {}) {
  return cn(fieldControlBaseClasses, className);
}

export function fieldDescriptionClassNames({
  className,
}: Pick<FieldDescriptionProps, "className"> = {}) {
  return cn(fieldDescriptionBaseClasses, className);
}

export function fieldErrorClassNames({
  className,
}: Pick<FieldErrorProps, "className"> = {}) {
  return cn(fieldErrorBaseClasses, className);
}

export const Field = forwardRef<HTMLElement, FieldProps>(
  (
    {
      as: Element = "div",
      children,
      className,
      disabled = false,
      id,
      invalid = false,
      orientation = "vertical",
      readOnly = false,
      required = false,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const [descriptionIds, setDescriptionIds] = useState<string[]>([]);
    const [errorIds, setErrorIds] = useState<string[]>([]);
    const registerDescription = useCallback((descriptionId: string) => {
      setDescriptionIds((ids) => addUniqueId(ids, descriptionId));

      return () => {
        setDescriptionIds((ids) => removeId(ids, descriptionId));
      };
    }, []);
    const registerError = useCallback((errorId: string) => {
      setErrorIds((ids) => addUniqueId(ids, errorId));

      return () => {
        setErrorIds((ids) => removeId(ids, errorId));
      };
    }, []);
    const contextValue = useMemo<FieldContextValue>(
      () => ({
        controlId,
        descriptionIds,
        disabled,
        errorIds,
        invalid,
        orientation,
        readOnly,
        registerDescription,
        registerError,
        required,
      }),
      [
        controlId,
        descriptionIds,
        disabled,
        errorIds,
        invalid,
        orientation,
        readOnly,
        registerDescription,
        registerError,
        required,
      ],
    );

    return (
      <FieldContext.Provider value={contextValue}>
        {createElement(
          Element,
          {
            ...props,
            ref,
            "data-slot": "field",
            "data-disabled": disabled ? "true" : undefined,
            "data-invalid": invalid ? "true" : undefined,
            "data-orientation": orientation,
            "data-readonly": readOnly ? "true" : undefined,
            "data-required": required ? "true" : undefined,
            className: fieldClassNames({ className }),
          },
          children,
        )}
      </FieldContext.Provider>
    );
  },
);

Field.displayName = "Field";

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  (
    {
      children,
      className,
      htmlFor,
      requiredMarker = "*",
      ...props
    },
    ref,
  ) => {
    const field = useFieldContext();
    const required = field?.required ?? false;

    return (
      <label
        {...props}
        ref={ref}
        htmlFor={htmlFor ?? field?.controlId}
        data-slot="field-label"
        data-disabled={field?.disabled ? "true" : undefined}
        data-invalid={field?.invalid ? "true" : undefined}
        data-required={required ? "true" : undefined}
        className={fieldLabelClassNames({ className })}
      >
        {children}
        {required && requiredMarker !== false ? (
          <span aria-hidden="true" className={fieldRequiredMarkerClasses}>
            {requiredMarker}
          </span>
        ) : null}
      </label>
    );
  },
);

FieldLabel.displayName = "FieldLabel";

export const FieldControl = forwardRef<HTMLElement, FieldControlProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-errormessage": ariaErrorMessage,
      "aria-invalid": ariaInvalid,
      asChild = false,
      children,
      className,
      disabled,
      id,
      readOnly,
      required,
      ...props
    },
    ref,
  ) => {
    const field = useFieldContext();
    const resolvedId = id ?? field?.controlId;
    const resolvedDisabled = Boolean(field?.disabled || disabled);
    const resolvedReadOnly = Boolean(field?.readOnly || readOnly);
    const resolvedRequired = Boolean(field?.required || required);
    const resolvedInvalid = Boolean(field?.invalid);
    const describedBy = mergeIds(
      ariaDescribedBy,
      ...(field?.descriptionIds ?? []),
      ...(resolvedInvalid ? field?.errorIds ?? [] : []),
    );
    const errorMessage = resolvedInvalid
      ? mergeIds(ariaErrorMessage, ...(field?.errorIds ?? []))
      : ariaErrorMessage;
    const controlProps = {
      ...props,
      ref,
      id: resolvedId,
      "aria-describedby": describedBy,
      "aria-errormessage": errorMessage,
      "aria-invalid": resolvedInvalid ? true : ariaInvalid,
      "data-slot": "field-control",
      "data-disabled": resolvedDisabled ? "true" : undefined,
      "data-invalid": resolvedInvalid ? "true" : undefined,
      "data-readonly": resolvedReadOnly ? "true" : undefined,
      "data-required": resolvedRequired ? "true" : undefined,
      className: fieldControlClassNames({ className }),
    };

    if (asChild) {
      const childArray = Children.toArray(children);
      const child = childArray[0];

      if (childArray.length !== 1 || !isValidElement<FieldControlSlotProps>(child)) {
        throw new Error("FieldControl with asChild expects a single React element child.");
      }

      const childDescribedBy = mergeIds(
        child.props["aria-describedby"],
        controlProps["aria-describedby"],
      );
      const childErrorMessage = resolvedInvalid
        ? mergeIds(child.props["aria-errormessage"], controlProps["aria-errormessage"])
        : mergeIds(child.props["aria-errormessage"], ariaErrorMessage);

      return cloneElement(
        child,
        {
          ...controlProps,
          ...child.props,
          ref: composeRefs(ref, getChildRef(child)),
          id: controlProps.id ?? child.props.id,
          "aria-describedby": childDescribedBy,
          "aria-errormessage": childErrorMessage,
          "aria-invalid": resolvedInvalid ? true : child.props["aria-invalid"] ?? ariaInvalid,
          "data-slot": "field-control",
          "data-disabled": resolvedDisabled ? "true" : undefined,
          "data-invalid": resolvedInvalid ? "true" : undefined,
          "data-readonly": resolvedReadOnly ? "true" : undefined,
          "data-required": resolvedRequired ? "true" : undefined,
          disabled: resolvedDisabled || child.props.disabled || undefined,
          readOnly: resolvedReadOnly || child.props.readOnly || undefined,
          required: resolvedRequired || child.props.required || undefined,
          className: cn(controlProps.className, child.props.className),
        } as Partial<FieldControlSlotProps>,
      );
    }

    return createElement("div", controlProps, children);
  },
);

FieldControl.displayName = "FieldControl";

export const FieldDescription = forwardRef<HTMLElement, FieldDescriptionProps>(
  (
    {
      as: Element = "p",
      children,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const field = useFieldContext();
    const generatedId = useId();
    const resolvedId = id ?? `${field?.controlId ?? "field"}-${generatedId}-description`;
    const hasContent = children !== null && children !== undefined;

    useRegisteredId({
      id: resolvedId,
      register: field?.registerDescription,
      shouldRegister: hasContent,
    });

    if (!hasContent) {
      return null;
    }

    return createElement(
      Element,
      {
        ...props,
        ref,
        id: resolvedId,
        "data-slot": "field-description",
        "data-disabled": field?.disabled ? "true" : undefined,
        className: fieldDescriptionClassNames({ className }),
      },
      children,
    );
  },
);

FieldDescription.displayName = "FieldDescription";

export const FieldError = forwardRef<HTMLElement, FieldErrorProps>(
  (
    {
      as: Element = "div",
      children,
      className,
      errors,
      id,
      ...props
    },
    ref,
  ) => {
    const field = useFieldContext();
    const generatedId = useId();
    const resolvedId = id ?? `${field?.controlId ?? "field"}-${generatedId}-error`;
    const messages = (errors ?? [])
      .map((error) => getErrorMessage(error))
      .filter((message): message is ReactNode => message !== null && message !== undefined);
    const content =
      children ??
      (messages.length === 0 ? null : messages.length === 1 ? (
        messages[0]
      ) : (
        <ul className="list-disc ps-4">
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      ));
    const hasContent = content !== null && content !== undefined;

    useRegisteredId({
      id: resolvedId,
      register: field?.registerError,
      shouldRegister: hasContent && Boolean(field?.invalid),
    });

    if (!hasContent) {
      return null;
    }

    return createElement(
      Element,
      {
        ...props,
        ref,
        id: resolvedId,
        "data-slot": "field-error",
        "data-invalid": field?.invalid ? "true" : undefined,
        className: fieldErrorClassNames({ className }),
      },
      content,
    );
  },
);

FieldError.displayName = "FieldError";
