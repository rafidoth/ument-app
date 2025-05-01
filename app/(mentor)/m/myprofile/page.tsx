"use client";
import { getMyProfileDetailsMentor } from "@/app/lib/fetchers/mentor";
import { updateMentorProfile } from "@/app/lib/mutations/mentor";
import { MentorInfoType } from "@/app/types";
import { hover_style, smooth_hover, theme_style } from "@/app/ui/CustomStyles";
import EditableField from "@/app/ui/EditableField";
import ImageUploader from "@/app/ui/ImageUploader";
import InterestBox from "@/app/ui/InterestBoxUI/InterestBox";
import {
  RowBorderedBox,
  RowBorderedBoxHeader,
  RowBorderedBoxRow,
} from "@/app/ui/RowBorderedBox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState<MentorInfoType | null>(null);
  const [unsaved, setUnsaved] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fn = async () => {
      const p: MentorInfoType = await getMyProfileDetailsMentor();
      setMyProfile(p);
    };
    fn();
  }, []);

  const handleSave = async () => {
    try {
      if (myProfile) {
        await updateMentorProfile(myProfile, null);
        setUnsaved(false);
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const updateProfilePicture = async () => {
    try {
      if (image && myProfile) {
        await updateMentorProfile(myProfile, image);
        toast.success("Profile picture updated successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (myProfile) {
    return (
      <div className="flex flex-col items-center relative">
        {unsaved && (
          <div
            onClick={handleSave}
            className="w-full bg-orange-800/10 py-1 mb-5 absolute  flex justify-center"
          >
            <span
              className={cn(
                hover_style,
                theme_style,
                "py-1 px-2 rounded-md select-none",
              )}
            >
              Save Changes
            </span>
          </div>
        )}
        <div className="flex gap-x-4 items-center justify-end p-3 w-1/2 mt-10">
          <div className="flex flex-col bg-orange-800/30   rounded-md">
            <span className="text-4xl py-2 font-bold px-6 text-orange-500">
              {myProfile.name}
            </span>
            <span className="text-xl py-2 px-6 border-t border-orange-500/20">
              {myProfile.email}
            </span>
            <Dialog>
              <DialogTrigger>
                <span className="text-sm py-2 px-6 border-t border-orange-500/20 flex justify-center hover:opacity-70 text-muted-foreground select-none">
                  Change Profile Picture
                </span>
              </DialogTrigger>
              <DialogContent className="min-w-[500px]">
                <DialogTitle>Update Profile Picture</DialogTitle>
                <div className="flex">
                  <div>
                    <span className="text-sm py-2 px-6 flex justify-center hover:opacity-70 text-muted-foreground select-none">
                      <ImageUploader
                        source={myProfile.image_link}
                        setImage={(img) => {
                          setImage(img);
                        }}
                        image={image}
                      />
                    </span>
                  </div>
                </div>
                <DialogClose onClick={updateProfilePicture}>Done</DialogClose>
              </DialogContent>
            </Dialog>
          </div>

          <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-orange-800">
            <Image
              src={myProfile.image_link}
              alt=""
              width={200}
              height={200}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        </div>

        <div className="w-1/2">
          <RowBorderedBox>
            <RowBorderedBoxHeader>
              <span className="text-3xl font-semibold">Bio</span>
            </RowBorderedBoxHeader>
            <RowBorderedBoxRow>
              <span>
                <EditableField
                  onChange={(newVal) => {
                    setUnsaved(true);
                    setMyProfile((prev) =>
                      prev ? { ...prev, bio: newVal } : null,
                    );
                  }}
                  value={myProfile.bio || ""}
                  placeholder="Enter your bio"
                  editIcon
                />
              </span>
            </RowBorderedBoxRow>
          </RowBorderedBox>
          <InterestBox role="mentor" />
        </div>
      </div>
    );
  }
};

export default MyProfile;
