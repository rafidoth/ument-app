"use client";
import React, { ReactElement } from "react";
import Toggler from "./Toggler";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { hover_style, smooth_hover, theme_style } from "./CustomStyles";
import { usePathname } from "next/navigation";

type Props = {
  SidebarElements: {
    name: string;
    icon: ReactElement;
    url: string;
  }[];
  SidebarTopNavigationButtons: {
    name: string;
    icon: ReactElement;
    url: string;
  }[];
};

const Sidebar = ({ SidebarElements, SidebarTopNavigationButtons }: Props) => {
  const [selected, setSelected] = React.useState<string>("");
  const thisurl = usePathname();
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
                thisurl === element.url ? theme_style : hover_style,
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
