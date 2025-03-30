"use client";
import { getGroupSessionsById } from "@/app/lib/student/fetchers";
import { GroupSessionInfoType } from "@/app/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { minutesToHours } from "../page";
import { ChevronLeft, Clock, Hourglass } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GroupSessionPageIndividual = () => {
  const [gsInfo, setGsInfo] = useState<GroupSessionInfoType | null>(null);
  const params = useParams();
  const gsid = params.gsid as string;
  const searchParams = useSearchParams();
  const bg = searchParams.get("bg");
  const text = searchParams.get("text");
  useEffect(() => {
    const fn = async () => {
      const data: GroupSessionInfoType = await getGroupSessionsById(gsid);
      setGsInfo(data);
    };
    fn();
  }, []);

  return (
    <div>
      {gsInfo && (
        <div
          className={cn(
            bg,
            "relative h-[400px] flex flex-col justify-center items-center"
          )}
        >
          <Link href={"/s/group-sessions"}>
            <div className="absolute z-10 top-0 left-0 p-5  hover:opacity-50 select-none ">
              <ChevronLeft />
            </div>
          </Link>
          <span className="flex  items-center font-semibold gap-x-2 ">
            <Image
              className="rounded-full border-2 border-white"
              src={gsInfo.mentorPhotoLink}
              alt="mentor image"
              width={40}
              height={40}
            />
            {gsInfo.mentorName}
          </span>
          <span className={cn(text, "text-9xl font-black ")}>
            {gsInfo.Title}
          </span>
          <span className="flex  gap-x-4 font-semiboldi my-4">
            <span className="flex gap-x-2">
              <Hourglass />
              {minutesToHours(gsInfo.DurationInMinutes)}
            </span>
            <span className="flex gap-x-2">
              <Clock />
              {format(gsInfo.StartTime, "Pp")}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default GroupSessionPageIndividual;
