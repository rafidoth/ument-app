"use client";
import React, { ReactElement, useEffect, useState } from "react";
import Toggler from "./Toggler";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { hover_style, smooth_hover, theme_style } from "./CustomStyles";
import { usePathname } from "next/navigation";
import { getNextBookedMentor } from "../lib/fetchers/mentor";
import { NextBookedType } from "../types";
import { getNextBookedStudent } from "../lib/mutations/student";
import { differenceInMinutes, isBefore } from "date-fns";
import { minutesToHours } from "../(student)/s/group-sessions/page";

type Props = {
  role: "student" | "mentor";
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

const calculateTimeLeft = (t: Date, d: number) => {
  const endtime = new Date(t.getTime() + d * 60 * 1000);
  const now = new Date();
  const diff = differenceInMinutes(now, endtime);
  return diff;
};

const Sidebar = ({
  role,
  SidebarElements,
  SidebarTopNavigationButtons,
}: Props) => {
  const [selected, setSelected] = React.useState<string>("");
  const thisurl = usePathname();
  const [nextBooked, setNextBooked] = useState<NextBookedType | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>();
  const nowtime = new Date();
  console.log(nextBooked);
  console.log("nowtime ", nowtime);
  useEffect(() => {
    const fn = async () => {
      let data: NextBookedType;
      if (role === "mentor") {
        data = await getNextBookedMentor(nowtime.toISOString());
        setNextBooked(data);
        if (isBefore(nowtime, data.StartTime)) {
          // upcoming
          setTimeLeft(differenceInMinutes(data.StartTime, nowtime));
        } else if (!isBefore(nowtime, data.StartTime)) {
          // on going
          // const end = new Date(
          //   data.StartTime.getTime() + data.DurationInMinutes * 60 * 1000
          // );
          // console.log("endtime", end);
          // setTimeLeft(differenceInMinutes(end, nowtime));
        }
      } else {
        data = await getNextBookedStudent(nowtime.toISOString());
        setNextBooked(data);
      }
    };
    fn();
  }, []);
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
        <Link href={"#"}>
          {nextBooked && !isBefore(nowtime, nextBooked.StartTime) && (
            <div className="flex flex-col bg-blue-900 rounded-md p-2 font-semibold text-center">
              <span>{nextBooked.SessionTitle}</span>
              <span>
                Ends in{" "}
                {calculateTimeLeft(
                  nextBooked.StartTime,
                  nextBooked.DurationInMinutes
                )}
              </span>
            </div>
          )}
          {nextBooked &&
            isBefore(nowtime, nextBooked.StartTime) &&
            timeLeft && (
              <div>
                {nextBooked.SessionTitle} will be started in{" "}
                {minutesToHours(timeLeft)}
              </div>
            )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
