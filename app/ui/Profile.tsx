"use client";
import React from "react";
import Image from "next/image";
import { StudentProfileSchema } from "../(student)/schemas";
import { z } from "zod";
import { StudentProfileData } from "../(student)/fake";
import { jakarta } from "../utils/font";
import { Button } from "@/components/ui/button";

type Props = {
  student: boolean;
};

const Profile = (props: Props) => {
  const [student, setStudent] = React.useState<z.infer<
    typeof StudentProfileSchema
  > | null>(null);

  React.useEffect(() => {
    if (props.student) {
      const s = StudentProfileSchema.parse(StudentProfileData);
      setStudent(s);
    } else {
      // mentor validated data
    }
  }, []);

  return (
    <div>
      <div className="flex height-[400px] justify-center gap-x-64 m-4">
        <div>
          <Image
            src={`https://robohash.org/${
              student ? student.student_id : "mentorpart"
            }.png?size=200x200`}
            alt="avatar"
            width={200}
            height={200}
            className="border rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-end text-lg">
            <span className=" bg-orange-500/30 px-2 rounded-xl flex justify-center items-center">
              student
            </span>
          </div>
          <div className={` text-6xl font-black`}>
            {student ? student.name : "Mentor Name"}
          </div>
          <div className="flex gap-x-4 text-xl text-muted-foreground justify-end">
            <div>@{student ? student.username : "mentor username"}</div>
            <div>{student ? student.email : "mentor mail"}</div>
          </div>
          <div className="flex justify-end my-3">
            <Button
              size={"custom"}
              variant={"outline"}
              className="cursor-pointer"
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
