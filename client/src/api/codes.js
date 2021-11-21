import * as axios from "axios";

const BASE_URL = "http://localhost:9000";

export const getAllCodes = async (pageSize, pageIndex) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/shortener`, {
      params: {
        pageSize,
        pageIndex,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCode = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/shortener/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
