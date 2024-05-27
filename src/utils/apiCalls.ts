import CustomAxios from "./customAxios";

export const template = async (params: string) => {
  try {
    const response = await CustomAxios.get("/abc", {
      params: { params: params },
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};
