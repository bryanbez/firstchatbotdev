import {
  DownloadIcon,
  ShareIcon,
  TrashIcon,
  GlobeIcon,
  PlusIcon,
  GithubIcon,
} from "@/app/svg";
import useButtonHandlers from "./button.handler";
import { ButtonProps, ModelButtonProps } from "./button.types";

export const buttonsOnNavbar: ButtonProps[] = [
  { Icon: DownloadIcon, label: "", tooltipLabel: "Download" },
  { Icon: ShareIcon, label: "", tooltipLabel: "Share" },
  { Icon: TrashIcon, label: "", tooltipLabel: "Trash" },
];

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

export const modelPickButtons = (
  handlers: ReturnType<typeof useButtonHandlers>
): ModelButtonProps[] => {
  const handleClick: ModelButtonProps["onClick"] = (model) =>
    handlers.handleModelTypePick(model);

  const buttonProps: Omit<ModelButtonProps, "onClick">[] = [
    {
      label: "general_ai",
      name: "🤖 General AI",
      desc: "Chat or answer general queries",
    },
    {
      label: "summarizer",
      name: "📝 Summarizer",
      desc: "Condense long text into short summary",
    },
    {
      label: "json_creator",
      name: "📊 JSON Creator",
      desc: "Generate JSON for graph data",
    },
    {
      label: "data_analyst",
      name: "📈 Data Analyst",
      desc: "Analyze tabular or CSV data",
    },
    {
      label: "coder",
      name: "💻 Code Helper",
      desc: "Generate or fix code snippets",
    },
  ];

  return buttonProps.map((props) => ({
    ...props,
    onClick: handleClick,
  }));
};
