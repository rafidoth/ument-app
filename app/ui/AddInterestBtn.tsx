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
import { All_Interests } from "../(student)/fake";

type Props = {
  AlreadySelected: InterestType[];
  SelectCount: number;
  student: boolean;
  setStudentInterests: (newInterests: InterestType[]) => void;
};

const AddInterestBtn = (props: Props) => {
  const [selectedInterests, setSelectedInterests] = React.useState<
    InterestType[]
  >(props.AlreadySelected);
  const [err, setErr] = React.useState<string | null>(null);
  const handleAddInterest = () => {
    if (props.student) {
      //add interests to student
      props.setStudentInterests(selectedInterests);
    } else {
      //add interests to mentor
    }
  };
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
            {selectedInterests?.length}/{props.SelectCount}
          </span>
        </DialogTitle>
        <div className="flex flex-wrap gap-2 h-[500px] overflow-y-auto">
          {All_Interests.map((interest) => (
            <span
              className={cn(
                theme_border,
                selectedInterests.some(
                  (selected) => selected.interest_id === interest.interest_id
                )
                  ? theme_style
                  : hover_style,
                "flex justify-center border p-2 cursor-pointer"
              )}
              key={interest.interest_id}
              onClick={() => {
                if (
                  selectedInterests.some(
                    (selected) => selected.interest_id === interest.interest_id
                  )
                ) {
                  setSelectedInterests(
                    selectedInterests.filter(
                      (i) => i.interest_id !== interest.interest_id
                    )
                  );
                  setErr(null);
                } else {
                  if (selectedInterests.length < props.SelectCount) {
                    setSelectedInterests([...selectedInterests, interest]);
                    setErr(null);
                  } else {
                    setErr("You can only select 5 interests");
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
            onClick={handleAddInterest}
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
