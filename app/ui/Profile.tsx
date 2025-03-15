"use client";
import React from "react";
import Image from "next/image";
import { StudentProfileSchema } from "../(student)/schemas";
import { z } from "zod";
import { StudentProfileData } from "../(student)/fake";
import { Button } from "@/components/ui/button";
import { InterestType } from "@/app/types";
import { cn } from "@/lib/utils";
import AddInterestBtn from "./AddInterestBtn";
import { theme_border, theme_style } from "./CustomStyles";
import { AddInterestToStudent } from "../(student)/actions/actions";
type Props = {
  student: boolean;
  data: StudentData;
};

type StudentData = {
  interests: InterestType[];
};

const Profile = (props: Props) => {
  const [student, setStudent] = React.useState<z.infer<
    typeof StudentProfileSchema
  > | null>(null);
  const [studentData, setStudentData] = React.useState<StudentData>(props.data);

  React.useEffect(() => {
    if (props.student) {
      const s = StudentProfileSchema.parse(StudentProfileData);
      setStudent(s);
    } else {
      // mentor validated data
    }
  }, []);
  //  React.useEffect

  React.useEffect(() => {
    const i_array = studentData.interests.map((i) => i.interest_id);
    const payload = {
      interestIds: i_array,
    };
    AddInterestToStudent(payload);
  }, [studentData.interests]);

  return (
    <div className="flex flex-col gap-y-4 p-5">
      <div className="flex flex-col  items-center  m-4">
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
      <div className="flex flex-col  font-semibold">
        <div className="flex gap-x-3 my-4 text-2xl">
          <span
            className={cn(
              theme_style,
              " flex justify-center w-48 rounded-xl px-2"
            )}
          >
            Interested At
          </span>
          <AddInterestBtn
            student={true}
            AlreadySelected={studentData.interests}
            setStudentInterests={(newInterests: InterestType[]) => {
              setStudentData({ ...studentData, interests: newInterests });
            }}
            SelectCount={5}
          />
        </div>
        <div className="flex gap-x-4 flex-wrap gap-y-2">
          {studentData.interests?.length > 0 ? (
            studentData.interests.map((interest) => (
              <span
                key={interest.interest_id}
                className={cn(
                  theme_border,
                  "flex justify-center rounded-full px-4 "
                )}
              >
                {interest.interest_name}
              </span>
            ))
          ) : (
            <span className=" text-lg font-normal text-muted-foreground">
              Click the Add Button to add interests
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
