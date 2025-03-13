"use client";
import React from "react";
import Toggler from "./Toggler";
import {
  Bell,
  Calendar,
  Globe,
  Group,
  History,
  Inbox,
  Workflow,
} from "lucide-react";
import { url } from "inspector";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { hover_style, smooth_hover, theme_style } from "./CustomStyles";

type Props = {
  SidebarElements: {
    name: string;
    icon: React.ReactNode;
    url: string;
  }[];
};

const SidebarTopNavigationButtons = [
  {
    name: "inbox",
    icon: <Inbox />,
    url: "/s/inbox",
  },
  {
    name: "notifications",
    icon: <Bell />,
    url: "/s/notifications",
  },
];

const SidebarElements = [
  {
    name: "Schedule",
    icon: <Calendar />,
    url: "/s/schedule",
  },
  {
    name: "Explore",
    icon: <Globe />,
    url: "/s/explore",
  },
  {
    name: "Group Sessions",
    icon: <Group />,
    url: "/s/group-sessions",
  },
  {
    name: "History",
    icon: <History />,
    url: "/s/history",
  },
  {
    name: "Jobs",
    icon: <Workflow />,
    url: "/s/jobs",
  },
];

const Sidebar = (props: Props) => {
  const [selected, setSelected] = React.useState<string>("");
  return (
    <div className="w-[300px] border-r h-screen flex flex-col ">
      <Toggler
        TogglerElements={SidebarTopNavigationButtons}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="my-4 p-2 flex flex-col gap-y-2">
        {SidebarElements.map((element) => (
          <Link
            href={element.url}
            key={element.name}
            onClick={() => setSelected(element.name)}
          >
            <div
              className={cn(
                "flex items-center gap-x-2 py-2 px-6 cursor-pointer text-lg",
                selected === element.name ? theme_style : hover_style,
                "rounded-xl",
                smooth_hover
              )}
            >
              {element.icon}
              <span>{element.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
