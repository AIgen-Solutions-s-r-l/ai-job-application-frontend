import { JobProfile, JobSearchParams, JobsList, PendingApplicationRecord, Transaction, MatchingJobsResponse } from "./definitions";
import { fetchUserResume } from "@/libs/api/resume";
import { toJobProfile } from "./utils/job-profile-util";
import { fetchMatchingJobs } from "./api/matching";
import { fetchAppliedJobs } from "./api/application";
import { fetchDetailedApplicationData, fetchPendingApplications } from "./api/apply_pending";
import { DetailedPendingApplication } from "./types/response-application.types";
import { ServerActionResult } from "./action-utils";
import { getBalance, getTransactions } from "./api/auth";

export async function getUserProfile(): Promise<JobProfile | null> {
  try {
    const userResume = await fetchUserResume();

    if (!userResume) {
      console.error("No resume data available");
      return null;
    }

    const profile: JobProfile = toJobProfile(userResume);

    return profile;
  } catch (error) {
    console.error("Error fetching user profiles from API:", error);
    return null;
  }
}

export async function fetchPassesData() {
  try {
    const fakeUserId = "fake-user-id";

    const passes = [
      {
        type: "day",
        delta: 24 * 60 * 60 * 1000,
      },
      {
        type: "week",
        delta: 7 * 24 * 60 * 60 * 1000,
      },
      {
        type: "month",
        delta: 30 * 24 * 60 * 60 * 1000,
      },
    ];

    const activePass = passes[1];

    const currentTime = new Date().getTime();
    const passExpiryTime = currentTime + activePass.delta;
    const remainingTime = passExpiryTime - currentTime;

    return {
      userId: fakeUserId,
      activePass: activePass.type,
      remainingTime: remainingTime > 0 ? remainingTime : 0,
      totalTime: passExpiryTime,
    };
  } catch (error) {
    console.error("Error in fetchPassesData:", error);
    return null;
  }
}

export async function getMatchingJobsData(params?: JobSearchParams): Promise<MatchingJobsResponse> {
    const queryString = Object.entries(params)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => `${key}=${encodeURIComponent(v)}`).join('&');
        } else {
          return `${key}=${encodeURIComponent(value)}`;
        }
      })
      .join('&');

    const response = await fetchMatchingJobs(queryString);
    
    return {
      jobs: response.jobs || [],
      total_count: response.total_count || 0
    };
}

export async function getPendingApplicationsData(): Promise<PendingApplicationRecord> {
  try {
    const pending = await fetchPendingApplications();

    const pendingApplications: PendingApplicationRecord = pending.jobs || {};

    return pendingApplications;
  } catch (error) {
    console.error("Error fetching pending applications from API:", error);
    return {};
  }
}

export async function getDetailedApplicationData(id: string): Promise<DetailedPendingApplication | null> {
  try {
    const applicationDetails: DetailedPendingApplication = await fetchDetailedApplicationData(id);

    // console.log("getDetailedApplicationData: \n", JSON.stringify(applicationDetails));

    return applicationDetails;
  } catch (error) {
    console.error("Error fetching application details from API:", error);
    return null;
  }
}

export async function getAppliedJobsData(): Promise<JobsList> {
  try {
    const applies = await fetchAppliedJobs();
    const appliedJobs: JobsList = applies || {};
    return appliedJobs;
  } catch (error) {
    console.error("Error fetching applied jobs from API:", error);
    return {};
  }
}

export const fetchBalanceData = async (): Promise<ServerActionResult<number>> => {
  try {
    const response = await getBalance();
    return { success: true, value: response.balance };
  } catch (error) {
    console.error("Error fetching user balance:", error);
    return { success: false, error: error.message };
  }
}

export const fetchTransactionsData = async (): Promise<Transaction[]> => {
  try {
    const response = await getTransactions();
    
    // Asegurarse de que response.transactions sea un array
    const transactions = Array.isArray(response.transactions) 
      ? response.transactions 
      : [];
      
    return transactions;
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    return [];
  }
}