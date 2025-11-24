import { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "textOnly";
export type ModelTypesList =
  | "summarizer"
  | "json_creator"
  | "data_analyst"
  | "coder"
  | "general_ai";

export const variantClasses: Record<ButtonVariant, string> = {
  primary: "p-2 rounded-xl bg-white lifting-animation-btn",
  secondary: "p-2 rounded-xl bg-green-500 text-white lifting-animation-btn",
  textOnly: "px-3 py-2 rounded-xl bg-white font-bold lifting-animation-btn",
};

export interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  Icon?: React.ElementType;
  tooltipLabel?: string;
}

export interface ModelButtonProps extends Omit<ButtonProps, "onClick"> {
  name?: string;
  desc?: string;
  label: ModelTypesList;
  onClick: (model: string) => void;
}

export interface SendButton {
  disabled: boolean;
  type: "submit";
  ariaLabel: string;
  className: string;
  children: React.ElementType;
}
