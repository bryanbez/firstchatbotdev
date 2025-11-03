"use client";

import React, { ReactNode } from "react";

import DownloadIcon from "@/app/svg/download";
import GithubIcon from "@/app/svg/github";
import GlobeIcon from "@/app/svg/globe";
import ShareIcon from "@/app/svg/share";
import PlusIcon from "@/app/svg/plus";
import useButtonHandlers from "./buttonHandlers";
import TrashIcon from "@/app/svg/trash";

type ButtonVariant = "primary" | "secondary" | "textOnly";

type ButtonProps = {
  label?: string;
  variant?: ButtonVariant;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  Icon?: React.ElementType;
  tooltipLabel?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "p-2 rounded-xl bg-white lifting-animation-btn",
  secondary: "p-2 rounded-xl bg-green-500 text-white lifting-animation-btn",
  textOnly: "px-3 py-2 rounded-xl bg-white font-bold lifting-animation-btn",
};

export const buttonsOnFooter = (
  handlers: ReturnType<typeof useButtonHandlers>
): ButtonProps[] => [
  { Icon: GlobeIcon, label: "", tooltipLabel: "Website" },
  {
    Icon: GithubIcon,
    label: "",
    tooltipLabel: "Github Link",
    onClick: () => handlers.handleGithubPage(),
  },
  { Icon: GlobeIcon, label: "", tooltipLabel: "Website" },
  {
    Icon: PlusIcon,
    label: "",
    tooltipLabel: "Add Chat",
    onClick: () => handlers.handleNewChat(),
  },
];

export const buttonsOnNavbar: ButtonProps[] = [
  { Icon: DownloadIcon, label: "", tooltipLabel: "Download" },
  { Icon: ShareIcon, label: "", tooltipLabel: "Share" },
  { Icon: TrashIcon, label: "", tooltipLabel: "Trash" },
];

const ButtonUI: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  children,
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${className}`}>
      {children}
      {label && <span>{label}</span>}
    </button>
  );
};

export default ButtonUI;
