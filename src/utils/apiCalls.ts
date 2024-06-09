// import { USER } from "../pages/Admin/UserManagement/UserManagement";
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

export const requestLogin = async (userDetails: any) => {
  try {
    const response = await CustomAxiosJson.post("/auth/login", userDetails);
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const requestUserDetails = async (token: string) => {
  try {
    const response = await CustomAxiosJson.post("/auth/getDetails", { token });
    return response;
  } catch (e: any) {
    return e.response;
  }
};
export const fetchAllLeads = async () => {
  try {
    const response = await CustomAxiosJson.get("/leads/getAllLeads");
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchUnassignedLeads = async () => {
  try {
    const response = await CustomAxiosJson.get("/leads/getUnassignedLeads");
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const assignLeadsToUser = async (data: any) => {
  try {
    const response = await CustomAxiosJson.post(
      "/leads//assignLeadsByUserIds",
      data
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const saveLeadsFile = async (file: FormData) => {
  try {
    const response = await CustomAxiosFormData.post("/leads/upload", file);
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const saveUser = async ({
  newUser,
  password,
}: {
  newUser: USER;
  password: string;
}) => {
  try {
    const response = await CustomAxiosJson.post("/users/addUser", {
      ...newUser,
      password,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const getAvaibleLeadsByDates = async (dates: any) => {
  try {
    console.log(dates);
    const response = await CustomAxiosJson.post(
      "/leads/getAvailableLeadsForDates",
      dates
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await CustomAxiosJson.get("/users/getUsers");
    return response;
  } catch (e: any) {
    return e.response;
  }
};
