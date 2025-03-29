"use client";
import { smooth_hover } from "@/app/ui/CustomStyles";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const fakeGroupSessionInfos = [
  {
    id: "fakeGSession",
    Title: "Golang Zero to One",
    Description: "Group session description",
    DurationInMinutes: 120,
    mentorId: "fakeMentorId",
    mentorName: "S Rafiul Hasan",
    mentorPhotoLink:
      "https://avatars.githubusercontent.com/u/67283985?s=400&u=785ba4e71821a24fee9df89190cbfab208e72dd3&v=4",
    participantCount: 37,
    participantTotal: 40,
  },
  {
    id: "fakeGSession2",
    Title: "React for Beginners",
    Description: "Learn the basics of React.js",
    DurationInMinutes: 90,
    mentorId: "fakeMentorId2",
    mentorName: "John Doe",
    mentorPhotoLink: "https://i.pravatar.cc/150?img=1",
    participantCount: 25,
    participantTotal: 30,
  },
  {
    id: "fakeGSession3",
    Title: "Advanced TypeScript",
    Description: "Deep dive into TypeScript features",
    DurationInMinutes: 150,
    mentorId: "fakeMentorId3",
    mentorName: "Jane Smith",
    mentorPhotoLink: "https://i.pravatar.cc/150?img=2",
    participantCount: 18,
    participantTotal: 20,
  },
  {
    id: "fakeGSession4",
    Title: "Python for Data Science",
    Description: "Explore Python libraries for data analysis",
    DurationInMinutes: 120,
    mentorId: "fakeMentorId4",
    mentorName: "Alice Johnson",
    mentorPhotoLink: "https://i.pravatar.cc/150?img=3",
    participantCount: 35,
    participantTotal: 40,
  },
  {
    id: "fakeGSession5",
    Title: "Introduction to Machine Learning",
    Description: "Understand the basics of ML algorithms",
    DurationInMinutes: 180,
    mentorId: "fakeMentorId5",
    mentorName: "Bob Brown",
    mentorPhotoLink: "https://i.pravatar.cc/150?img=4",
    participantCount: 20,
    participantTotal: 25,
  },
];
const colors = [
  {
    bg: "bg-orange-800",
    text: "text-orange-500",
  },
  {
    bg: "bg-blue-800",
    text: "text-blue-500",
  },
  {
    bg: "bg-green-800",
    text: "text-green-500",
  },
  {
    bg: "bg-red-800",
    text: "text-red-500",
  },
  {
    bg: "bg-purple-800",
    text: "text-purple-500",
  },
  {
    bg: "bg-yellow-800",
    text: "text-yellow-500",
  },
  {
    bg: "bg-teal-800",
    text: "text-teal-500",
  },
  {
    bg: "bg-pink-800",
    text: "text-pink-500",
  },
];

type Props = {};

const GroupSessionPage = (props: Props) => {
  return (
    <ScrollArea className="h-screen">
      <div className="p-16 flex flex-wrap gap-10">
        {fakeGroupSessionInfos.map((grpSession, i) => (
          <GroupSessionCard
            key={grpSession.id}
            GroupSessionDetails={grpSession}
            ColorTheme={colors[i % colors.length]}
          />
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

const GroupSessionCard = ({ GroupSessionDetails, ColorTheme }) => {
  const router = useRouter();
  const handleGSClick = () => {
    router.replace(
      `/s/group-sessions/${GroupSessionDetails.id}?bg=${ColorTheme.bg}&text=${ColorTheme.text}`
    );
  };
  return (
    <Card
      className={cn(" w-[700px] hover:opacity-90 select-none", ColorTheme.bg)}
      onClick={handleGSClick}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2 font-semibold">
            <Image
              className="rounded-full border-2 border-white"
              src={GroupSessionDetails.mentorPhotoLink}
              alt="mentor image"
              width={50}
              height={50}
            />
            <span>{GroupSessionDetails.mentorName}</span>
          </div>
          <div>
            {GroupSessionDetails.participantCount}/
            {GroupSessionDetails.participantTotal}
          </div>
        </div>
        <CardTitle className={cn("text-8xl font-black ", ColorTheme.text)}>
          {GroupSessionDetails.Title}
        </CardTitle>
        <div className="flex justify-end">
          <span
            className={cn(
              "font-semibold cursor-pointer hover:opacity-80",
              smooth_hover
            )}
          >
            {" "}
            Book A Seat
          </span>
        </div>
      </CardHeader>
    </Card>
  );
};

export default GroupSessionPage;
