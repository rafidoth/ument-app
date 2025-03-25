import { getSessionsStudent } from "@/app/lib/fetchers/sessions";
import { SessionInfoType } from "@/app/types";
import SessionCard from "@/app/ui/SessionCard";
import React from "react";

type Props = {};

const SessionsPage = async (props: Props) => {
  const sessions: SessionInfoType[] = await getSessionsStudent();
  return (
    <div className="p-4">
      <span className="font-semibold text-4xl ">1:1 Sessions</span>
      <div className="flex flex-wrap gap-4 my-8 justify-center overflow-y-scroll ">
        {sessions.map((s, i: number) => (
          <SessionCard key={i} sessionDetails={s} student={true} />
        ))}
      </div>
    </div>
  );
};

export default SessionsPage;
