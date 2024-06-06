import { userData } from "../pages/Admin/UserManagement/UserManagement";
import { CustomAxiosFormData, CustomAxiosJson } from "./customAxios";

export const template = async (params: string) => {
  try {
    const response = await CustomAxiosJson.get("/abc", {
      params: { params: params },
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};
export const fetchAllLeads = async () => {
  try {
    const response = await CustomAxiosJson.get("/api/leads/getAllLeads");
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchUnassignedLeads = async () => {
  try {
    const response = await CustomAxiosJson.get("/api/leads/getUnassignedLeads");
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const assignLeadsToUser = async (data: any) => {
  try {
    const response = await CustomAxiosJson.post(
      "/api/leads/assignLeadsByUserType",
      data
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const saveLeadsFile = async (file: FormData) => {
  try {
    const response = await CustomAxiosFormData.post("/api/leads/upload", file);
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const saveUser = async (userDetails: userData) => {
  try {
    const response = await CustomAxiosJson.post(
      "/api/users/addUser",
      userDetails
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const getAvaibleLeadsByDates = async (dates: any) => {
  try {
    console.log(dates);
    const response = await CustomAxiosJson.post(
      "api/leads/getAvailableLeadsForDates",
      dates
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await CustomAxiosJson.get("/api/users/getUsers");
    return response;
  } catch (e: any) {
    return e.response;
  }
};
