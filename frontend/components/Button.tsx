import { cva, type VariantProps } from "class-variance-authority";
import { Pressable, Text, type PressableProps } from "react-native";

const buttonVariants = cva(
  "items-center justify-center rounded-xl px-5 py-3.5 active:opacity-90",
  {
    variants: {
      variant: {
        primary: "bg-blue-600",
        danger: "bg-red-600",
        secondary: "bg-slate-200",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & {
    label: string;
  };

export function Button({
  label,
  variant,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDanger = variant === "danger";
  const isSecondary = variant === "secondary";
  const backgroundColor = isDanger ? "#dc2626" : isSecondary ? "#e2e8f0" : "#2563eb";
  const buttonStyle = {
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor,
    opacity: disabled ? 0.6 : 1,
  };
  return (
    <Pressable
      className={buttonVariants({ variant, className })}
      style={buttonStyle}
      disabled={disabled}
      {...props}
    >
      <Text className={isSecondary ? "text-slate-700 font-semibold" : "text-white font-semibold"} style={{ color: isSecondary ? "#334155" : "#fff", fontWeight: "600" as const }}>{label}</Text>
    </Pressable>
  );
}
