import type { ReactNode } from "react";
import TemplatePage from "../pages/TemplatePage";
import SettingsPage from "../pages/SettingsPage";
import AboutPage from "../pages/AboutPage";

export type TileId = "template" | "settings" | "about";

type TileDef = {
  label: string;
  render: () => ReactNode;
};

export const TILES: Record<TileId, TileDef> = {
  template: {
    label: "Template",
    render: () => <TemplatePage />,
  },
  settings: {
    label: "Settings",
    render: () => <SettingsPage />,
  },
  about: {
    label: "About",
    render: () => <AboutPage />,
  },
};

export const AVAILABLE_TILES: Array<{ id: TileId; label: string }> = [
  { id: "template", label: "Template" },
  { id: "settings", label: "Settings" },
  { id: "about", label: "About" },
];
