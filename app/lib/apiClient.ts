"use server";

import { cookies } from "next/headers";
import { single_student_interests } from "../(student)/fake";
import {
  fakeAvailabilities,
  FakeMentorInfo,
  FakeStudentInfo,
  getFakeSessionInfo,
} from "../data/fake";

const USE_FAKE: boolean = true;
export type ApiRequestType = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
};

export async function apiRequest({
  endpoint,
  method = "GET",
  body,
  auth = true,
}: ApiRequestType) {
  if (USE_FAKE) {
    return fakeApiRequest(endpoint);
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new Error("Authentication token missing");
    }

    headers["Authorization"] = `Bearer ${token}`;
  }
  const url = `${apiUrl}/${endpoint}`;
  console.log("Sending Request to ", url);

  const res = await fetch(url, {
    method,
    headers,
    ...(typeof body === "object" && body !== null
      ? { body: JSON.stringify(body) }
      : {}),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      `API Error ${res.status}: ${res.statusText}. ${errorData?.message || ""}`
    );
  }

  return res.json();
}

async function fakeApiRequest(endpoint: string): Promise<unknown> {
  console.log("Fake API request", endpoint);
  if (endpoint === "api/student/interests/list") {
    return { success: true, data: single_student_interests };
  } else if (endpoint === "api/mentor/interests/list") {
    return { success: true, data: single_student_interests };
  } else if (endpoint === "api/student/fakeStudentId") {
    return { success: true, data: FakeStudentInfo };
  } else if (endpoint === "api/mentor/fakeMentorId") {
    return {
      success: true,
      data: FakeMentorInfo,
    };
  } else if (endpoint === "api/student/interests/update") {
    return {
      success: true,
      message: "Student interests updated successfully",
      interestsUpdated: 2,
      interests: single_student_interests,
    };
  } else if (endpoint === "api/mentor/sessions") {
    return {
      success: true,
      data: [
        getFakeSessionInfo("SPL Midterm Question Solve Session"),
        getFakeSessionInfo("SPL Final Question Solve Session"),
        getFakeSessionInfo("OOP Midterm Question Solve Session"),
      ],
    };
  } else if (endpoint === "api/mentor/avalability/add") {
    return {
      success: true,
    };
  } else if (endpoint === "api/mentor/availability") {
    return {
      success: true,
      data: fakeAvailabilities,
    };
  } else {
    return { success: false, message: "Unknown endpoint" };
  }
}
