const BASE_URL = "";

const queryString = (arr) => arr.reduce((p, c, ci, a) => p + (c[1] !== 0 && !c[1] ? '' : `${c[0]}=${c[1]}` + `${ci === a.length-1 ? '' : '&'}`), '?');

export const DEV = true;

export const API = {
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

export const DUMMY = {
  host: {
    posts: [
      {
        startDate: "2022-11-01",
        //endDate
        startTime: "12:00",
        endTime: "14:00",
      },
      {
        startDate: "2022-11-03",
        //endDate
        startTime: "02:00",
        endTime: "04:00",
      },
      {
        startDate: "2022-11-03",
        //endDate
        startTime: "06:00",
        endTime: "08:00",
      },
      {
        startDate: "2022-11-04",
        //endDate
        startTime: "02:00",
        endTime: "04:00",
      },
    ],
  }
}