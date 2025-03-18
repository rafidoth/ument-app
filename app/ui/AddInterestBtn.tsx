import React from "react";
import { hover_style, theme_border, theme_style } from "./CustomStyles";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InterestType } from "../types";
import { All_Interests } from "../data/fake";
import { useStudentData } from "../contexts/StudentDataContext";

type Props = {
  SelectCount: number;
  student: boolean;
  setStudentInterests: (newInterests: InterestType[]) => void;
};

const AddInterestBtn = (props: Props) => {
  const { studentData, updateStudentInterests } = useStudentData();
  const [err, setErr] = React.useState<string | null>(null);
  return (
    <Dialog>
      <DialogTrigger>
        <span
          className={cn(
            hover_style,
            theme_border,
            "flex justify-center border  px-2 cursor-pointer"
          )}
          onClick={() => console.log("add interest")}
        >
          +
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="flex justify-between pr-5">
          Add interests
          <span>
            {studentData?.interests?.length}/{props.SelectCount}
          </span>
        </DialogTitle>
        <div className="flex flex-wrap gap-2 h-[500px] overflow-y-auto">
          {All_Interests.map((interest) => (
            <span
              className={cn(
                theme_border,
                studentData?.interests.some(
                  (selected) => selected.interest_id === interest.interest_id
                )
                  ? theme_style
                  : hover_style,
                "flex justify-center border p-2 cursor-pointer"
              )}
              key={interest.interest_id}
              onClick={() => {
                if (
                  studentData?.interests.some(
                    (selected) => selected.interest_id === interest.interest_id
                  )
                ) {
                  if (studentData && studentData.interests.length === 1) {
                    setErr("Atleast 1 interest should be selected");
                  } else {
                    updateStudentInterests(
                      studentData.interests.filter(
                        (i) => i.interest_id !== interest.interest_id
                      )
                    );
                    setErr(null);
                  }
                } else {
                  if (
                    studentData &&
                    studentData?.interests.length < props.SelectCount
                  ) {
                    // add interest
                    updateStudentInterests([
                      ...studentData?.interests,
                      interest,
                    ]);
                    setErr(null);
                  } else {
                    setErr("Atmost 5 interests can be selected");
                  }
                }
              }}
            >
              {interest.interest_name}
            </span>
          ))}
        </div>

        {err && <span className="text-red-500">{err}</span>}
        <DialogClose>
          <span
            className={cn(
              theme_border,
              hover_style,
              "flex justify-center p-2 cursor-pointer"
            )}
          >
            Done
          </span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AddInterestBtn;
