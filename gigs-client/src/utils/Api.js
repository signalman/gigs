import axios from 'axios';

const ax = axios.create();

/**
 * 데이터가 담긴 객체를 Query String 으로 변경해주는 함수
 * @param {{}} obj Query String 으로 표현할 데이터
 * @returns "name=park&age=27" ...
 */
const queryString = (obj) => {
  const resultArr = [];

  for(let key of Object.keys(obj)) {
    if(!obj[key] && obj[key] !== 0) continue;
    resultArr.push(`${key}=${obj[key]}`);
  }

  return resultArr.join('&');
}

/**
 * 회원가입을 위해 유저 이름과 uid 를 가져오는 API
 * @param {String} uuid 세션에 저장된 데이터를 가져오기 위한 uuid
 */
export const fetchUserNameAndUid = (uuid) => ax.get(`/signup?${queryString({uuid})}`);

/**
 * 회원가입 API
 * @param {{uid, name, siDo, siGun, road, detail, phoneNumber, role}} signUpData 회원가입에 필요한 데이터
 */
export const signUp = (signUpData) => ax.post('/signup', signUpData);

/**
 * 마이 페이지 접속 시 유저 정보 가져오는 API
 */
export const fetchMyPage = () => ax.get('/mypage');

/**
 * 마이 페이지 접속 시 유저 정보 가져오는 API
 */
export const posts = (postsData) => ax.post('/posts',postsData);

/**
 * 로그아웃 API
 */
export const logout = () => ax.get(`/logout`);

/**
 * 마이 페이지에서 스타가 무대를 찾고있는 지 여부를 설정하는 API
 */
export const toggleStarStatus = () => ax.post('/mypage/status');

/**
 * 공연을 찾고 있는 스타들을 리스트로 가져오는 API
 * @param {{name, stageTypes: [], genres: [], address, gender }} conditions 검색 조건
 * @param {String} sort 정렬 방식
 * @param {Number} size 페이지 사이즈
 * @param {Number} page 현재 페이지 번호
 */
export const fetchStarList = ({name, stageTypes, genres, address, gender,}, sort, size, page) => {
  const data = {
    name,
    stageTypes: stageTypes?.join(','),
    genres: genres?.join(','),
    address, gender, sort, size, page
  };

  return ax.get(`/stars?${queryString(data)}`);
};

/**
 * 스타를 찾는 호스트들을 리스트로 가져오는 API
 * @param {{name, stageTypes, genres, address, targetAge, targetGender, targetMinCount, startDate, endDate, startTime, endTime}} conditions 검색 조건
 * @param {*} sort 정렬 방식
 * @param {*} size 페이지 사이즈
 * @param {*} page 현재 페이지 번호
 * @returns 
 */
export const fetchHostList = ({name, stageTypes, genres, address, targetAge, targetGender, targetMinCount, startDate, endDate, startTime, endTime}, sort, size, page) => {
  const data = {
    stageTypes: stageTypes?.join(','),
    genres: genres?.join(','),
    name, address, targetAge, targetGender, targetMinCount, startDate, endDate, startTime, endTime, sort, size, page,
  };

  return ax.get(`/stages?${queryString(data)}`);
};

/**
 * 호스트 상세 정보 가져오는 API
 * @param {String} hostId 찾으려는 호스트의 id
 */
export const fetchHostInfo = (hostId) => ax.get(`/stages/${hostId}`);

/**
 * 스타 상세 정보를 가져오는 API
 * @param {String} starId 찾으려는 스타의 id
 */
export const fetchStarInfo = async (starId) => ax.get(`/stars/${starId}`);

/**
 * 호스트 상세 정보를 수정하는 API
 * @param {String} hostId 수정하려는 호스트의 id
 * @param {{}} data 수정하려는 데이터
 */
// export const updateHostInfo = async (hostId, data) => ax.put(`/stages/${hostId}`, data);
export const updateHostInfo = async (hostId, data) => ax.put(`/stages`, data);

/**
 * 스타 상세 정보를 수정하는 API
 * @param {String} starId 수정하려는 스타의 id
 * @param {{}} data 수정하려는 데이터
 */
export const updateStarInfo = async (starId, data) => ax.put(`/stars/${starId}`, data);

export const updateRepImage = async(data) => ax.post(`/stars/rep-image`,data);

export const updateSubImage = async(data) => ax.post(`/stars/images`,data);

export const deleteRepImage = async() => ax.delete(`/stars/rep-image`);

export const deleteSSubImage = async(imageId) => ax.delete(`/stars/images/${imageId}`)

/**
 * 포스트 하나를 삭제하는 API
 * @param {String} postId 삭제하려는 포스트의 id
 */
export const deletePost = (postId) => ax.delete(`/posts/${postId}`);