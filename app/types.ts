import { z } from "zod";
import { StudentInfoSchema } from "./(student)/schemas";

export type InterestType = {
  interest_id: string;
  interest_name: string;
};
export type StudentPersonalInfoType = z.infer<typeof StudentInfoSchema>;
