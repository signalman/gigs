const BASE_URL = "http://localhost:8080";

const queryString = (arr) => arr.reduce((p, c, ci, a) => p + `${c[0]}=${c[1]}` + `${ci === a.length-1 ? '' : '&'}`, '?');

/**
 * name: String
stageTypes: Array<String>
genres: Array<String>
address: String
gender: String
sort: String
 */

export const API = {
  getStarCards: (name, stageTypes, genres, address, gender, sort) => `${BASE_URL}/stars${queryString([
    ['name', name],
    ['stageTypes', stageTypes.join(',')],
    ['genres', genres.join(',')],
    ['address', address],
    ['gender', gender],
    ['sort', sort],
  ])}`,
}