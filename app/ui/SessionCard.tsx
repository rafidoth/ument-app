import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SessionInfoType } from "../types";
import { Clock, Banknote } from "lucide-react";

type Props = {
  sessionDetails: SessionInfoType;
};

const SessionCard = ({ sessionDetails }: Props) => {
  return (
    <Card className="w-[350px] my-5">
      <CardHeader>
        <CardTitle className="text-xl">{sessionDetails.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-lg">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{sessionDetails.DurationInMinutes} minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <Banknote className="w-4 h-4" />
          <span>৳{sessionDetails.Price}</span>
        </div>
        <div className="flex gap-2">
          {sessionDetails.session_medium.map((medium) => (
            <span
              key={medium}
              className="text-sm bg-secondary px-2 py-1 rounded"
            >
              {medium}
            </span>
          ))}
        </div>
        <CardDescription className="whitespace-pre-line text-lg">
          {sessionDetails.Description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" className="cursor-pointer">
          Edit
        </Button>
        <Button variant="destructive" size="sm" className="cursor-pointer">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SessionCard;
