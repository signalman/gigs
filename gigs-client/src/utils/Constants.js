const BASE_URL = "";

export const DEV = true;

export const ifNull = (val, prefix='', suffix='', msg='데이터를 추가해주세요.') => {
  return (val || val === 0 || val === 'DEFAULT') ? `${prefix}${val}${suffix}` : msg;
}

export const to00 = (num) => {
  return num < 10 ? `0${num}` : String(num);
};

export const URL = {
  kakaoAuthorize: `http://localhost:8080/oauth2/authorization/kakao`,
  naverAuthorize: `http://localhost:8080/oauth2/authorization/naver`,
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
  // main: "#D046D2",
  main: "#D00E64",
  whity: "#f8f8f8",
  grey: "#808080",
  blacky: "#404040",
  lightBlack: "#c0c0c0",
}

export const DUMMY = {
  host: {
    stageName: '카페 안녕',
    stageSize: '35',
    targetAge: '20',
    targetGender: "WOMEN",
    targetMinCount: "100",
    pay: '100000',
    stageType: 'BAR',
    avgScore: '4.9',
    showCount: '1000',
    reviewCount: '55',
    address: {
      road: "경기도 수원시 영통구 중부대로246번길 48-7"
    },
    posts: [
      {
        startDate: "2022-11-01",
        //endDate
        startTime: "12:00",
        endTime: "14:00",
        genres: ['JAZZ'],
      },
      {
        startDate: "2022-11-03",
        //endDate
        startTime: "02:00",
        endTime: "04:00",
        genres: ['HIPHOP'],
      },
      {
        startDate: "2022-11-03",
        //endDate
        startTime: "06:00",
        endTime: "08:00",
        genres: ['JAZZ', 'HIPHOP'],
      },
      {
        startDate: "2022-11-04",
        //endDate
        startTime: "02:00",
        endTime: "04:00",
        genres: ['JAZZ'],
      },
    ],
    stageInfo: "<h1>안녕하세요 카페 안녕입니다.</h1><p>방문해주셔서 <strong>감사</strong>합니다.</p>"
  },
  stageTypes: ["CAFE", "BAR", "RESTAURANT", "SCHOOL"],
  genres: ["DANCE", "SESSION", "ROCK", "HIPHOP", "INDIE", "JAZZ", "POP"],
}

export const ENUM = {
  MIXED: '혼성',
  ALL: '모두',
  MEN: '남성',
  WOMEN: '여성',

  CAFE: '카페',
  BAR: '바',
  RESTAURANT: '레스토랑',
  SCHOOL: '학교',

  DANCE: '댄스',
  SESSION: '세션',
  ROCK: '락',
  HIPHOP: '힙합',
  INDIE: '인디',
  JAZZ: '재즈',
  POP: '팝',
}

export const IMG = (img) => img ? `https://gigs-bucket.s3.ap-northeast-2.amazonaws.com/${img}` : '';