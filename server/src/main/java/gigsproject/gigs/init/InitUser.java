//package gigsproject.gigs.init;
//
//import gigsproject.gigs.domain.*;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Profile;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.annotation.PostConstruct;
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//
//@Profile("local")
//@Component
//@RequiredArgsConstructor
//public class InitUser {
//    private final InitUserService initUserService;
//
//    @PostConstruct
//    public void init(){
//        initUserService.init();
//    }
//
//    @Component
//    static class InitUserService{
//        @PersistenceContext
//        EntityManager em;
//
//        @Transactional
//        public void init(){
//            //장르 더미데이터 생성
//            Genre genre1 = new Genre(null, "인디");
//            Genre genre2 = new Genre(null, "팝");
//            Genre genre3 = new Genre(null, "힙합");
//            Genre genre4 = new Genre(null, "락");
//            Genre genre5 = new Genre(null, "발라드");
//            em.persist(genre1);
//            em.persist(genre2);
//            em.persist(genre3);
//            em.persist(genre4);
//            em.persist(genre5);
//
//            //무대타입 더미데이터 생성
//            StageType stageType1 = new StageType(null, "카페");
//            StageType stageType2 = new StageType(null, "술집");
//            StageType stageType3 = new StageType(null, "식당");
//            em.persist(stageType1);
//            em.persist(stageType2);
//            em.persist(stageType3);
//
//            //주소 더미데이터 생성
//            Address address1 = new Address("수원시", "장안구", "율전동");
//            Address address2 = new Address("서울시", "중구", "이태원동");
//            Address address3 = new Address("수원시", "영통구", "매탄동");
//            Address address4 = new Address("서울시", "동작구", "사당동");
//
//            //유저 더미데이터 생성 - 스타
//            User user1 = new User(null, "uid1", "userName1", 0, "010-1234-5678", "qwerqwer", address1);
//            User user2 = new User(null, "uid2", "userName2", 0, "010-1234-5678", "qwerqwer", address2);
//            User user3 = new User(null, "uid3", "userName3", 0, "010-1234-5678", "qwerqwer", address3);
//            User user4 = new User(null, "uid4", "userName4", 0, "010-1234-5678", "qwerqwer", address4);
//
//            //스타 더미데이터 생성
//            Star star1 = new Star(null, user1, "starName1", "women", 3, "소개글...", 2, true, 2.1, null, null, null, null);
//            Star star2 = new Star(null, user2, "starName2", "men", 1, "소개글...", 3, true, 4.2, null, null, null, null);
//            Star star3 = new Star(null, user3, "starName3", "men", 6, "소개글...", 3, true, 3.3, null, null, null, null);
//            Star star4 = new Star(null, user4, "starName4", "women", 2, "소개글...", 20, true, 2.5, null, null, null, null);
//
//            //스타무대타입 더미데이터 생성
//            StarStageType starStageType1 = new StarStageType(null, star1, stageType1);
//            StarStageType starStageType2 = new StarStageType(null, star1, stageType2);
//            StarStageType starStageType3 = new StarStageType(null, star1, stageType3);
//            starStageType1.setStar(star1);
//            starStageType2.setStar(star1);
//            starStageType3.setStar(star1);
//
//            StarStageType starStageType4 = new StarStageType(null, star2, stageType1);
//            StarStageType starStageType5 = new StarStageType(null, star2, stageType2);
//            starStageType4.setStar(star2);
//            starStageType5.setStar(star2);
//
//            StarStageType starStageType6 = new StarStageType(null, star3, stageType3);
//            starStageType6.setStar(star3);
//
//            StarStageType starStageType7 = new StarStageType(null, star4, stageType2);
//            starStageType7.setStar(star4);
//
//            //스타장르 더미데이터 생성
//            StarGenre starGenre1 = new StarGenre(null, star1, genre1);
//            StarGenre starGenre2 = new StarGenre(null, star1, genre2);
//            starGenre1.setStar(star1);
//            starGenre2.setStar(star1);
//
//            StarGenre starGenre3 = new StarGenre(null, star2, genre3);
//            StarGenre starGenre4 = new StarGenre(null, star2, genre4);
//            starGenre3.setStar(star2);
//            starGenre4.setStar(star2);
//
//            StarGenre starGenre5 = new StarGenre(null, star3, genre2);
//            starGenre5.setStar(star3);
//
//            StarGenre starGenre6 = new StarGenre(null, star4, genre1);
//            StarGenre starGenre7 = new StarGenre(null, star4, genre2);
//            StarGenre starGenre8 = new StarGenre(null, star4, genre3);
//            StarGenre starGenre9 = new StarGenre(null, star4, genre4);
//            starGenre6.setStar(star4);
//            starGenre7.setStar(star4);
//            starGenre8.setStar(star4);
//            starGenre9.setStar(star4);
//
//
//            //스타 이미지 더미데이터 생성
//            StarImg starImg1 = new StarImg(null, "/documents/xxx/xxx", star1);
//            StarImg starImg2 = new StarImg(null, "/documents/xxx/xxx", star1);
//            StarImg starImg3 = new StarImg(null, "/documents/xxx/xxx", star1);
//            starImg1.setStar(star1);
//            starImg2.setStar(star1);
//            starImg3.setStar(star1);
//
//            StarImg starImg4 = new StarImg(null, "/fdf/dfaf/sdfas", star2);
//            StarImg starImg5 = new StarImg(null, "/fdf/dfaf/sdfas", star2);
//            starImg4.setStar(star2);
//            starImg5.setStar(star2);
//
//            StarImg starImg6 = new StarImg(null, "/xx/xx/xx", star3);
//            starImg6.setStar(star3);
//
//
//            //리뷰 더미데이터 생성
//
//            //더미 데이터 저장
//            em.persist(user1);
//            em.persist(user2);
//            em.persist(user3);
//            em.persist(user4);
//
//            em.persist(star1);
//            em.persist(star2);
//            em.persist(star3);
//            em.persist(star4);
//
//            em.persist(starStageType1);
//            em.persist(starStageType2);
//            em.persist(starStageType3);
//            em.persist(starStageType4);
//            em.persist(starStageType5);
//            em.persist(starStageType6);
//            em.persist(starStageType7);
//
//            em.persist(starImg1);
//            em.persist(starImg2);
//            em.persist(starImg3);
//            em.persist(starImg4);
//            em.persist(starImg5);
//            em.persist(starImg6);
//
//            em.persist(starGenre1);
//            em.persist(starGenre2);
//            em.persist(starGenre3);
//            em.persist(starGenre4);
//            em.persist(starGenre5);
//            em.persist(starGenre6);
//            em.persist(starGenre7);
//            em.persist(starGenre8);
//            em.persist(starGenre9);
//
//
//        }
//    }
//}
