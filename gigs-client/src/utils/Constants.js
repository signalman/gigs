const BASE_URL = "http://localhost:8080";

const queryString = (arr) => arr.reduce((p, c, ci, a) => p + (c[1] !== 0 && !c[1] ? '' : `${c[0]}=${c[1]}` + `${ci === a.length-1 ? '' : '&'}`), '?');

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
  searchStar: '/star',
  searchStage: '/stage',
};

export const SYMBOL = {
  star: Symbol('star'),
  stage: Symbol('stage'),
}