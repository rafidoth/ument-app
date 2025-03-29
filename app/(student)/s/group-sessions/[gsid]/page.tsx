"use client";
import { cn } from "@/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const GroupSessionPageIndividual = (props: Props) => {
  const { gsid } = useParams();
  const searchParams = useSearchParams();
  const bg = searchParams.get("bg");
  const text = searchParams.get("text");
  return (
    <div
      className={cn(
        bg,
        text,
        "h-[400px] text-9xl font-black flex justify-center items-center"
      )}
    >
      {gsid}
    </div>
  );
};

export default GroupSessionPageIndividual;
