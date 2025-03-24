"use client";
import React from "react";

import { cn } from "@/lib/utils";
import { DateTimePicker } from "@/app/ui/CalendarUI/CustomDateTimePicker";
import { hover_style, smooth_hover, theme_border } from "@/app/ui/CustomStyles";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
type Props = {};

const AddAvailabilityBooking = (props: Props) => {
  const handleAvailabilitySave = () => {
    // new availability post request to server
    console.log("Save");
  };
  return (
    <Dialog>
      <DialogTrigger>
        <button
          className={cn(
            theme_border,
            hover_style,
            smooth_hover,
            "px-4 cursor-pointer text-lg"
          )}
        >
          Add Availability
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl">Create Avaliablity</DialogTitle>
        <div className="text-lg flex flex-col gap-4">
          <span className="mx-3 font-semibold">Start</span>
          <DateTimePicker field={{ value: "", onChange: () => {} }} />
          <span className="mx-3 font-semibold">End</span>
          <DateTimePicker field={{ value: "", onChange: () => {} }} />
        </div>
        <DialogClose>
          <button
            className={cn(
              theme_border,
              hover_style,
              smooth_hover,
              "px-4 text-lg"
            )}
            onClick={handleAvailabilitySave}
          >
            {" "}
            Save
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AddAvailabilityBooking;
