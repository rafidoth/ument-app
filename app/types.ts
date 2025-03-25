import { z } from "zod";
import { StudentInfoSchema } from "./(student)/schemas";
import { MentorInfoSchema } from "./(mentor)/schemas";

export type InterestType = {
  interest_id: string;
  interest_name: string;
};
export type StudentPersonalInfoType = z.infer<typeof StudentInfoSchema>;
export type MentorPersonalInfoType = z.infer<typeof MentorInfoSchema>;

export type meeting_medium = "Online" | "Offline";

export type SessionInfoType = {
  sessionId: string;
  mentorId: string;
  type: SessionType;
  title: string;
  DurationInMinutes: number;
  session_medium: meeting_medium[];
  Description: string;
  Price: number;
};

export type AvalabilityType = {
  id?: string;
  start: Date;
  end: Date;
  booked: boolean;
};

export type SessionType =
  | "Course Topic Tution"
  | "Project Help"
  | "Career Guidance"
  | "Competition Prep"
  | "Productivity"
  | "ECA";
