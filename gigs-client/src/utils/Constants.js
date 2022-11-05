const BASE_URL = "http://localhost:8080";

const queryString = (arr) => arr.reduce((p, c, ci, a) => p + (c[1] !== 0 && !c[1] ? '' : `${c[0]}=${c[1]}` + `${ci === a.length-1 ? '' : '&'}`), '?');

export const API = {
  signUp: ({id, name, address, phoneNumber}) => `${BASE_URL}/signup${queryString([
    ['id', id],
    ['name', name],
    ['address', address],
    ['phoneNumber', phoneNumber],
  ])}`,
  getStarCards: ({name, stageTypes, genres, address, gender,}, sort, size, page) => `${BASE_URL}/stars${queryString([
    ['name', name],
    ['stageTypes', stageTypes?.join(',')],
    ['genres', genres?.join(',')],
    ['address', address],
    ['gender', gender],
    ['sort', sort],
    ['size', size],
    ['page', page],
  ])}`,
  getStageCards: ({name, stageTypes, genres, address, targetAge, targetGender, targetMinCount, startDate, endDate, startTime, endTime}, sort, size, page) => `${BASE_URL}/stages${queryString([
    ['name', name],
    ['stageTypes', stageTypes?.join(',')],
    ['genres', genres?.join(',')],
    ['address', address],
    ['targetAge', targetAge],
    ['targetGender', targetGender],
    ['targetMinCount', targetMinCount],
    ['startDate', startDate],
    ['endDate', endDate],
    ['startTime', startTime],
    ['endTime', endTime],
    ['sort', sort],
    ['size', size],
    ['page', page],
  ])}`,
  kakaoAuthorize: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`,
};

export const PATH = {
  main: '/',
  searchStar: '/star',
  searchStage: '/stage',
  review: '/review',
  myPage: '/mypage',
  
};

export const SYMBOL = {
  star: Symbol('star'),
  stage: Symbol('stage'),
}

export const COLOR = {
  main: "#D046D2",
  whity: "#f8f8f8",
  grey: "#808080",
  blacky: "#404040",
  lightBlack: "#c0c0c0",
}