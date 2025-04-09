"use client";
import { getMyProfileDetails } from "@/app/lib/fetchers/student";
import { StudentInfoType } from "@/app/types";
import EditableField from "@/app/ui/EditableField";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState<StudentInfoType | null>(null);

  useEffect(() => {
    const fn = async () => {
      const p: StudentInfoType = await getMyProfileDetails();
      setMyProfile(p);
    };
    fn();
  }, []);

  if (myProfile) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center my-10">
          <Card className="border-none bg-blue-800/30 px-5">
            <div className="flex justify-center items-center w-full gap-x-4">
              <Image
                src={`https://robohash.org/${myProfile?.username}.png?size=200x200`}
                alt="my profile"
                width={100}
                height={100}
                className="rounded-full border-2 border-white"
              />
              <span className="flex flex-col">
                <EditableField
                  className="text-6xl font-semibold text-blue-500"
                  value={myProfile.name}
                  onChange={() => {}}
                />
                <div>
                  <span className="bg-orange-900 px-2 rounded-sm font-semibold">
                    student
                  </span>
                </div>
              </span>
            </div>
          </Card>
        </div>
        <div className=" w-full flex text-xl justify-evenly">
          <div className="flex flex-col gap-y-2">
            <span className="flex justify-center items-center gap-x-2">
              <span>Email</span>
              <EditableField
                value={"email@gmail.com"}
                onChange={() => console.log("heloo")}
                className="p-2 rounded-md  text-blue-400 bg-blue-800/30 text-xl p"
              />
            </span>
            <span className="flex justify-center items-center gap-x-2">
              <span>username</span>
              <EditableField
                value={myProfile?.username}
                onChange={(newVal) =>
                  setMyProfile({ ...myProfile, username: newVal })
                }
                className="p-2 rounded-md  text-blue-400 bg-blue-800/30 text-xl p"
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default MyProfile;
