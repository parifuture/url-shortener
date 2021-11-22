import * as axios from "axios";

const BASE_URL = "http://localhost:9000";

export const getAllCodes = async (pageSize, pageIndex) => {
  const response = await axios.get(`${BASE_URL}/api/shortener`, {
    params: {
      pageSize,
      pageIndex,
    },
  });
  return response.data;
};

export const deleteCode = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/shortener/${id}`);
  return response.data;
};

export const createNewCode = async (url) => {
  const body = {
    url,
  };
  const response = await axios.post(`${BASE_URL}/api/shortener`, {
    ...body,
  });
  return response.data;
};
