import {
  AvalabilityType,
  InterestType,
  MentorInfoType,
  SessionInfoType,
  SessionType,
} from "@/app/types";
import { apiRequest, ApiRequestType } from "../apiClient";
import { format } from "date-fns";

export async function addAvailability(
  start: Date,
  end: Date,
  medium: ("online" | "offline")[],
) {
  const req: ApiRequestType = {
    endpoint: "api/mentor/availability/add",
    method: "POST",
    body: {
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      medium: medium,
    },
    auth: true,
  };
  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Adding Avalability Failed.");
  }
}
export async function deleteAvailability(availability: AvalabilityType) {
  const req: ApiRequestType = {
    endpoint: `api/mentor/availability/${availability.id}`,
    method: "DELETE",
    auth: true,
  };
  const res = await apiRequest(req);
  return res.success;
}

export async function updateInterestListMentor(interests: InterestType[]) {
  const req: ApiRequestType = {
    endpoint: "api/mentor/interests/list",
    method: "PUT",
    body: {
      interestIds: interests.map((i) => {
        return i.interest_id;
      }),
    },
    auth: true,
  };
  const res = await apiRequest(req);
  return res;
}

export async function updateMentorProfile(
  data: MentorInfoType,
  imageFile: null | File,
) {
  const req: ApiRequestType = {
    endpoint: "api/mentor/myself",
    method: "PUT",
    body: {
      name: data.name,
      email: data.email,
      username: data.username,
      gender: data.gender,
      grad_year: data.grad_year,
      bio: data.bio,
      socials: {
        github: data.socials.github,
        facebook: data.socials.facebook,
        linkedin: data.socials.linkedin,
        twitter: data.socials.twitter,
      },
      password: data.password,
      dob: data.dob.toISOString(),
      image: imageFile,
    },
    auth: true,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    console.error(req.body);
    throw new Error("Failed to update mentor profile");
  }
}

export async function createSession(sinfo: SessionInfoType) {
  const req: ApiRequestType = {
    endpoint: "api/sessions/new",
    method: "POST",
    body: {
      title: sinfo.title,
      type: sinfo.type,
      duration: sinfo.DurationInMinutes,
      medium: sinfo.session_medium,
      description: sinfo.Description,
      price: sinfo.Price,
    },
    auth: true,
    ignoreError: true,
  };
  const res = await apiRequest(req);
  if (res.ok) {
    return {
      err: null,
      data: res.data,
    };
  } else {
    return {
      err: res.error,
      data: null,
    };
  }
}
