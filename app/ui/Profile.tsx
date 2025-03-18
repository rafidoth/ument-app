"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InterestType, StudentPersonalInfoType } from "@/app/types";
import { cn } from "@/lib/utils";
import AddInterestBtn from "./AddInterestBtn";
import { theme_border, theme_style } from "./CustomStyles";
import { useStudentData } from "../contexts/StudentDataContext";
import { apiRequest, ApiRequestType } from "../lib/apiClient";
import { useRouter } from "next/navigation";
import { getStudentPersonalInfo } from "@/lib/fetchers/student";

type Props = {
  student: boolean;
  interests: InterestType[];
};

const Profile = (props: Props) => {
  const [sID, setSID] = React.useState<string | null>(null);
  const { studentData, updateStudentInterests, updateStudentInfo } =
    useStudentData();
  const router = useRouter();
  const personalInfo: StudentPersonalInfoType | undefined =
    studentData?.personalInfo;

  React.useEffect(() => {
    if (props.student) {
      const getStudentIdLocal = (): string | null => {
        if (typeof window !== "undefined") {
          const storedData = localStorage.getItem("student_id");
          if (storedData) {
            return storedData;
          } else {
            router.replace("/sign-in");
          }
        }
        return null;
      };
      const student_id = getStudentIdLocal();
      console.log("student id ", student_id);
      setSID(student_id);
      updateStudentInterests(props.interests);
    } else {
      // mentor validated data
    }
  }, []);

  React.useEffect(() => {
    const fn = async () => {
      if (sID) {
        const sInfo = await getStudentPersonalInfo(sID);
        updateStudentInfo(sInfo);
      }
    };
    fn();
  }, [sID]);

  React.useEffect(() => {
    const i_array: string[] = studentData
      ? (studentData.interests ?? []).map((i) => i.interest_id)
      : [];
    const payload = {
      interestIds: i_array,
    };
    if (payload) {
      const fn = async () => {
        const req: ApiRequestType = {
          endpoint: "api/student/interests/update",
          method: "PUT",
          body: payload,
          auth: true,
        };
        const res = await apiRequest(req);
        console.log(res);
      };
      fn();
    }
  }, [studentData?.interests]);

  return (
    <div className="flex flex-col gap-y-4 p-5">
      <div className="flex flex-col  items-center  m-4">
        <div>
          <Image
            src={`https://robohash.org/${
              props.student ? personalInfo?.name : "mentorpart"
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
            {props.student ? personalInfo?.name : "Mentor Name"}
          </div>
          <div className="flex gap-x-4 text-xl text-muted-foreground justify-end">
            <div>
              @{props.student ? personalInfo?.username : "mentor username"}
            </div>
            <div>
              {props.student ? studentData?.personalInfo?.email : "mentor mail"}
            </div>
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
            setStudentInterests={(newInterests: InterestType[]) => {
              updateStudentInterests(newInterests);
            }}
            SelectCount={5}
          />
        </div>
        <div className="flex gap-x-4 font-normal flex-wrap gap-y-4 w-1/2">
          {studentData && (studentData.interests ?? []).length > 0 ? (
            (studentData.interests ?? []).map((interest) => (
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
