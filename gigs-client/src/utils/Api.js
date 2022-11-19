import axios from 'axios';

const ax = axios.create();

export const fetchMyPage = async (callback) => {
  const response = await ax.get("/mypage");
  callback(response);
}

export const fetchHostInfo = async (hostId, callback) => {
  const response = await ax.get(`/stages/${hostId}`);
  callback(response);
}

export const fetchStarInfo = async (starId, callback) => {
  const response = await ax.get(`/stars/${starId}`);
  callback(response);
}