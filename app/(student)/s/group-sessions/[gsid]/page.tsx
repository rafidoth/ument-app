"use client";
import {
  getGroupSessionParticipants,
  getGroupSessionsById,
} from "@/app/lib/student/fetchers";
import { GroupSessionInfoType, GroupSessionParticipantInfo } from "@/app/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { minutesToHours } from "../page";
import { ChevronLeft, Clock, Hourglass } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { smooth_hover } from "@/app/ui/CustomStyles";

const GroupSessionPageIndividual = () => {
  const [gsInfo, setGsInfo] = useState<GroupSessionInfoType | null>(null);
  const [participants, setParticipants] = useState<
    GroupSessionParticipantInfo[]
  >([]);
  const params = useParams();
  const gsid = params.gsid as string;
  const searchParams = useSearchParams();
  const bg = searchParams.get("bg");
  const text = searchParams.get("text");
  useEffect(() => {
    const fn = async () => {
      const data: GroupSessionInfoType = await getGroupSessionsById(gsid);
      setGsInfo(data);
      const p: GroupSessionParticipantInfo[] =
        await getGroupSessionParticipants(gsid);
      setParticipants(p);
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
              src={gsInfo.mentor.photoLink}
              alt="mentor image"
              width={40}
              height={40}
            />
            {gsInfo.mentor.name}
          </span>
          <span className={cn(text, "text-9xl font-black ")}>
            {gsInfo.title}
          </span>
          <span className="flex  gap-x-4 font-semiboldi my-4">
            <span className="flex gap-x-2">
              <Hourglass />
              {minutesToHours(gsInfo.durationInMinutes)}
            </span>
            <span className="flex gap-x-2">
              <Clock />
              {format(gsInfo.startTime, "Pp")}
            </span>
          </span>
          <span
            className={cn(
              "rounded-full border border-orange-500 px-2 hover:bg-orange-500 cursor-pointer",
              smooth_hover
            )}
            onClick={() => {
              console.log("hello world");
            }}
          >
            {" "}
            Book A Seat Now
          </span>
        </div>
      )}
      <div className="w flex justify-center">
        <span>
          <Table className="w-[1200px] my-10 text-lg p-2 rounded-xl  ">
            <TableHeader className="p-10">
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Registered At</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            {participants.map((p, i) => (
              <TableBody key={i}>
                <TableRow>
                  <TableCell className="flex  items-center gap-x-2 ">
                    <Image
                      className="rounded-full"
                      src={p.photoLink}
                      alt="participant image"
                      width={40}
                      height={40}
                    />
                    <span>{p.name}</span>
                  </TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{format(p.joinedAt, "PPp")}</TableCell>
                  <TableCell>{p.status}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </span>
      </div>
    </div>
  );
};

export default GroupSessionPageIndividual;
