package gigsproject.gigs.init;

import gigsproject.gigs.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;

import static gigsproject.gigs.domain.Gender.*;
import static gigsproject.gigs.domain.Genre.*;
import static gigsproject.gigs.domain.Role.ROLE_HOST;
import static gigsproject.gigs.domain.Role.ROLE_STAR;
import static gigsproject.gigs.domain.StageType.*;

@Profile("local")
@Component
@RequiredArgsConstructor
public class InitUser {
    private final InitUserService initUserService;

//    @PostConstruct
    public void init() {
        initUserService.init();
    }

    @Component
    static class InitUserService {
        @PersistenceContext
        EntityManager em;

        @Transactional
        public void init() {

            //주소 더미데이터 생성
            Address address1 = new Address("경기도 수원시", "영통구", "경기도 수원시 영통구 매탄대로 21길 23", "313번지");
            Address address2 = new Address("경기도 수원시", "권선구", "경기도 수원시 권선구 햇빛로 77길 11", "11동 220호");
            Address address3 = new Address("경기도 용인시", "수지구", "경기도 용인시 수지구 풍덕천로 41길 5", "222동 333호");

            for (int i = 0; i < 100; i++) {

                User user = User.builder()
                        .uid("uid" + i)
                        .name("유저" + i)
                        .role(ROLE_STAR)
                        .phone("01012345678")
                        .address(address1)
                        .build();
                em.persist(user);
                Star star = Star.builder()
                        .user(user)
                        .name("스타" + i)
                        .gender(Gender.MEN)
                        .introduce("대충 소개글...")
                        .memberNumber(i % 6 + 1)
                        .showCount(i % 10)
                        .status(StarStatus.ACTIVE)
                        .score(3.2)
                        .starStageTypes(new ArrayList<>())
                        .starGenres(new ArrayList<>())
                        .starImgs(new ArrayList<>())
                        .reviews(new ArrayList<>())
                        .build();

                em.persist(star);

                if (i % 4 == 0) {
                    StarStageType starStageType = StarStageType.builder()
                            .stageType(BAR)
                            .star(star)
                            .build();
                    starStageType.setStar(star);
                    em.persist(starStageType);
                } else if (i % 4 == 1) {
                    StarStageType starStageType1 = StarStageType.builder()
                            .stageType(BAR)
                            .star(star)
                            .build();
                    StarStageType starStageType2 = StarStageType.builder()
                            .stageType(RESTAURANT)
                            .star(star)
                            .build();
                    starStageType1.setStar(star);
                    starStageType2.setStar(star);
                    em.persist(starStageType1);
                    em.persist(starStageType2);
                } else if (i % 4 == 2) {
                    StarStageType starStageType1 = StarStageType.builder()
                            .stageType(RESTAURANT)
                            .star(star)
                            .build();
                    StarStageType starStageType2 = StarStageType.builder()
                            .stageType(CAFE)
                            .star(star)
                            .build();
                    StarStageType starStageType3 = StarStageType.builder()
                            .stageType(SCHOOL)
                            .star(star)
                            .build();
                    starStageType1.setStar(star);
                    starStageType2.setStar(star);
                    starStageType3.setStar(star);
                    em.persist(starStageType1);
                    em.persist(starStageType2);
                    em.persist(starStageType3);
                } else {
                    StarStageType starStageType1 = StarStageType.builder()
                            .stageType(CAFE)
                            .star(star)
                            .build();
                    starStageType1.setStar(star);
                    em.persist(starStageType1);
                }


                if (i % 5 == 0) {
                    StarGenre starGenre1 = StarGenre.builder()
                            .star(star)
                            .genre(DANCE)
                            .build();
                    StarGenre starGenre2 = StarGenre.builder()
                            .star(star)
                            .genre(POP)
                            .build();
                    starGenre1.setStar(star);
                    starGenre2.setStar(star);
                    em.persist(starGenre1);
                    em.persist(starGenre2);

                } else if (i % 5 == 1) {
                    StarGenre starGenre1 = StarGenre.builder()
                            .star(star)
                            .genre(JAZZ)
                            .build();
                    starGenre1.setStar(star);
                    em.persist(starGenre1);

                } else if (i % 5 == 2) {
                    StarGenre starGenre1 = StarGenre.builder()
                            .star(star)
                            .genre(DANCE)
                            .build();
                    StarGenre starGenre2 = StarGenre.builder()
                            .star(star)
                            .genre(ROCK)
                            .build();
                    starGenre1.setStar(star);
                    starGenre2.setStar(star);
                    em.persist(starGenre1);
                    em.persist(starGenre2);

                } else if (i % 5 == 3) {
                    StarGenre starGenre1 = StarGenre.builder()
                            .star(star)
                            .genre(HIPHOP)
                            .build();
                    StarGenre starGenre2 = StarGenre.builder()
                            .star(star)
                            .genre(SESSION)
                            .build();
                    StarGenre starGenre3 = StarGenre.builder()
                            .star(star)
                            .genre(POP)
                            .build();
                    starGenre1.setStar(star);
                    starGenre2.setStar(star);
                    starGenre3.setStar(star);
                    em.persist(starGenre1);
                    em.persist(starGenre2);
                    em.persist(starGenre3);

                } else if (i % 5 == 4) {
                    StarGenre starGenre1 = StarGenre.builder()
                            .star(star)
                            .genre(POP)
                            .build();
                    starGenre1.setStar(star);
                    em.persist(starGenre1);
                }

                StarImg starImg = StarImg.builder()
                        .star(star)
                        .url("/documents/files/...")
                        .build();
                StarImg starImg1 = StarImg.builder()
                        .star(star)
                        .url("/files/myfiles/..")
                        .build();
                starImg.setStar(star);
                starImg1.setStar(star);

                em.persist(starImg);
                em.persist(starImg1);

            }

            /**
             * Host 및 Post dummy Data (총 4개 Host, 100개 Post)
             */
            User user = User.builder()
                    .uid("1234567")
                    .name("유저")
                    .role(ROLE_HOST)
                    .phone("01012345678")
                    .address(address2)
                    .build();
            em.persist(user);

            Address stageAddress = address3;
            Host host1 = Host.builder()
                    .user(user)
                    .stageName("abc")
                    .stageInfo("무대 정보입니다!!")
                    .openTime(LocalTime.of(11, 0))
                    .closeTime(LocalTime.of(18, 0))
                    .stageType(StageType.BAR)
                    .stageSize(23.4)
                    .pay(100000)
                    .stageAddress(stageAddress)
                    .targetGender(MEN)
                    .targetAge(20)
                    .targetNumber(40)
                    .build();
            Host host2 = Host.builder()
                    .user(user)
                    .stageName("xyz")
                    .stageInfo("무대 정보입니다.")
                    .openTime(LocalTime.of(9, 0))
                    .closeTime(LocalTime.of(22, 0))
                    .stageType(CAFE)
                    .stageSize(40.1)
                    .pay(300000)
                    .stageAddress(stageAddress)
                    .targetGender(WOMEN)
                    .targetAge(30)
                    .targetNumber(20)
                    .showCount(10)
                    .avgScore(4.1)
                    .reviewCount(5)
                    .build();
            Host host3 = Host.builder()
                    .user(user)
                    .stageName("defgh")
                    .stageInfo("무대 정보입니다.")
                    .openTime(LocalTime.of(9, 0))
                    .closeTime(LocalTime.of(22, 0))
                    .stageType(SCHOOL)
                    .stageSize(100.5)
                    .pay(1000000)
                    .stageAddress(stageAddress)
                    .targetGender(MIXED)
                    .targetAge(10)
                    .targetNumber(100)
                    .showCount(10)
                    .avgScore(4.8)
                    .reviewCount(11)
                    .build();
            Host host4 = Host.builder()
                    .user(user)
                    .stageName("riolkg")
                    .stageInfo("무대 정보입니다.")
                    .openTime(LocalTime.of(9, 0))
                    .closeTime(LocalTime.of(22, 0))
                    .stageType(CAFE)
                    .stageSize(10.1)
                    .pay(150000)
                    .stageAddress(stageAddress)
                    .targetGender(MEN)
                    .targetAge(20)
                    .targetNumber(10)
                    .showCount(2)
                    .avgScore(3.1)
                    .reviewCount(1)
                    .build();
            Host host5 = Host.builder()
                    .user(user)
                    .stageName("qweryy")
                    .stageInfo("무대 정보입니다.")
                    .openTime(LocalTime.of(17, 0))
                    .closeTime(LocalTime.of(23, 0))
                    .stageType(BAR)
                    .stageSize(70.0)
                    .pay(50000)
                    .stageAddress(stageAddress)
                    .targetGender(WOMEN)
                    .targetAge(30)
                    .targetNumber(30)
                    .showCount(46)
                    .avgScore(4.3)
                    .reviewCount(22)
                    .build();
            em.persist(host1);
            em.persist(host2);
            em.persist(host3);
            em.persist(host4);
            em.persist(host5);

            LocalDate startDate1 = LocalDate.of(2022, 11, 1);
            LocalDate endDate1 = LocalDate.of(2022, 11, 5);
            LocalTime startTime1 = LocalTime.of(18, 0);
            LocalTime endTime1 = LocalTime.of(21, 0);

            LocalDate startDate2 = LocalDate.of(2022, 11, 1);
            LocalDate endDate2 = LocalDate.of(2022, 11, 3);
            LocalTime startTime2 = LocalTime.of(12, 0);
            LocalTime endTime2 = LocalTime.of(15, 0);

            LocalDate startDate3 = LocalDate.of(2022, 11, 1);
            LocalDate endDate3 = LocalDate.of(2022, 11, 17);
            LocalTime startTime3 = LocalTime.of(17, 0);
            LocalTime endTime3 = LocalTime.of(22, 30);

            LocalDate startDate4 = LocalDate.of(2022, 11, 4);
            LocalDate endDate4 = LocalDate.of(2022, 11, 9);
            LocalTime startTime4 = LocalTime.of(18, 0);
            LocalTime endTime4 = LocalTime.of(20, 0);

            LocalDate startDate5 = LocalDate.of(2022, 11, 9);
            LocalDate endDate5 = LocalDate.of(2022, 11, 15);
            LocalTime startTime5 = LocalTime.of(16, 0);
            LocalTime endTime5 = LocalTime.of(21, 0);

            Post post1 = Post.builder()
                    .host(host1)
                    .startDate(startDate1)
                    .endDate(endDate1)
                    .startTime(startTime1)
                    .endTime(endTime1)
                    .build();
            em.persist(post1);
            Post post2 = Post.builder()
                    .host(host1)
                    .startDate(startDate2)
                    .endDate(endDate2)
                    .startTime(startTime2)
                    .endTime(endTime2)
                    .build();
            em.persist(post2);

            Post post3 = Post.builder()
                    .host(host2)
                    .startDate(startDate3)
                    .endDate(endDate3)
                    .startTime(startTime4)
                    .endTime(endTime4)
                    .build();
            em.persist(post3);

            Post post4 = Post.builder()
                    .host(host3)
                    .startDate(startDate3)
                    .endDate(endDate3)
                    .startTime(startTime5)
                    .endTime(endTime5)
                    .build();
            em.persist(post4);

            Post post5 = Post.builder()
                    .host(host5)
                    .startDate(startDate4)
                    .endDate(endDate4)
                    .startTime(startTime4)
                    .endTime(endTime4)
                    .build();
            em.persist(post5);
            Post post6 = Post.builder()
                    .host(host4)
                    .startDate(startDate1)
                    .endDate(endDate1)
                    .startTime(startTime5)
                    .endTime(endTime5)
                    .build();
            em.persist(post6);

            Post post7 = Post.builder()
                    .host(host3)
                    .startDate(startDate3)
                    .endDate(endDate3)
                    .startTime(startTime5)
                    .endTime(endTime5)
                    .build();
            em.persist(post7);

            Post post8 = Post.builder()
                    .host(host5)
                    .startDate(startDate3)
                    .endDate(endDate3)
                    .startTime(startTime3)
                    .endTime(endTime3)
                    .build();
            em.persist(post8);

            Post post9 = Post.builder()
                    .host(host2)
                    .startDate(startDate4)
                    .endDate(endDate4)
                    .startTime(startTime4)
                    .endTime(endTime4)
                    .build();
            em.persist(post9);

            Post post10 = Post.builder()
                    .host(host2)
                    .startDate(startDate1)
                    .endDate(endDate1)
                    .startTime(startTime1)
                    .endTime(endTime1)
                    .build();
            em.persist(post10);

            Post post11 = Post.builder()
                    .host(host3)
                    .startDate(startDate2)
                    .endDate(endDate2)
                    .startTime(startTime4)
                    .endTime(endTime4)
                    .build();
            em.persist(post11);

            PostGenre postGenre1 = PostGenre.builder()
                    .post(post1)
                    .genre(HIPHOP)
                    .build();
            em.persist(postGenre1);
            post1.getPostGenres().add(postGenre1);
            PostGenre postGenre2 = PostGenre.builder()
                    .post(post2)
                    .genre(JAZZ)
                    .build();
            em.persist(postGenre2);
            post2.getPostGenres().add(postGenre2);
            PostGenre postGenre3 = PostGenre.builder()
                    .post(post3)
                    .genre(JAZZ)
                    .build();
            em.persist(postGenre3);
            post3.getPostGenres().add(postGenre3);

            PostGenre postGenre4 = PostGenre.builder()
                    .post(post4)
                    .genre(DANCE)
                    .build();
            em.persist(postGenre4);
            post4.getPostGenres().add(postGenre4);

            PostGenre postGenre5 = PostGenre.builder()
                    .post(post5)
                    .genre(ROCK)
                    .build();
            em.persist(postGenre5);
            post5.getPostGenres().add(postGenre5);

            PostGenre postGenre6 = PostGenre.builder()
                    .post(post6)
                    .genre(INDIE)
                    .build();
            em.persist(postGenre6);
            post6.getPostGenres().add(postGenre6);

            PostGenre postGenre7 = PostGenre.builder()
                    .post(post7)
                    .genre(JAZZ)
                    .build();
            em.persist(postGenre7);
            post7.getPostGenres().add(postGenre7);

            PostGenre postGenre8 = PostGenre.builder()
                    .post(post8)
                    .genre(SESSION)
                    .build();
            em.persist(postGenre8);
            post8.getPostGenres().add(postGenre8);

            PostGenre postGenre9 = PostGenre.builder()
                    .post(post9)
                    .genre(HIPHOP)
                    .build();
            em.persist(postGenre9);
            post9.getPostGenres().add(postGenre9);

            PostGenre postGenre10 = PostGenre.builder()
                    .post(post10)
                    .genre(ROCK)
                    .build();
            em.persist(postGenre10);
            post10.getPostGenres().add(postGenre10);

            PostGenre postGenre11 = PostGenre.builder()
                    .post(post11)
                    .genre(DANCE)
                    .build();
            em.persist(postGenre11);
            post11.getPostGenres().add(postGenre11);
        }
    }
}
