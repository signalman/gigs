import axios from 'axios';

const ax = axios.create();

export const fetchMyPage = async (callback) => {
  const response = await ax.get("/mypage");
  callback(response);
}