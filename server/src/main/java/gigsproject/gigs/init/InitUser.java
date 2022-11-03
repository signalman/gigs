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
import static gigsproject.gigs.domain.Role.*;
import static gigsproject.gigs.domain.StageType.*;

@Profile("local")
@Component
@RequiredArgsConstructor
public class InitUser {
    private final InitUserService initUserService;

    @PostConstruct
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
            Address address1 = new Address("수원시", "장안구", "율전동");
            Address address2 = new Address("서울시", "중구", "이태원동");
            Address address3 = new Address("수원시", "영통구", "매탄동");
            Address address4 = new Address("서울시", "동작구", "사당동");

            for (int i = 0; i < 100; i++) {

                User user = User.builder()
                        .uid("uid" + i)
                        .name("유저" + i)
                        .role(STAR)
                        .phone("01012345678")
                        .password("ppwwee")
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

            Address userAddress = new Address("수원시", "팔달구", "인계동");
            Address stageAddress = new Address("수원시", "팔달구", "우만동");
            LocalTime openTime = LocalTime.of(9, 0);
            LocalTime closeTime = LocalTime.of(22, 0);

            for (int i = 0; i < 20; i++) {
                User user = User.builder()
                        .uid("uid" + "(" + (i + 1) + ")")
                        .name("유저" + "(" + (i + 1) + ")")
                        .role(HOST)
                        .phone("01012345678")
                        .password("ppwwee")
                        .address(userAddress)
                        .build();
                em.persist(user);

                Host host;
                if (i % 2 == 1) {
                    host = Host.builder()
                            .user(user)
                            .stageName("abc")
                            .stageInfo("무대 정보입니다.")
                            .stageCount(10)
                            .openTime(openTime)
                            .closeTime(closeTime)
                            .stageType(StageType.BAR)
                            .stageSize(23.4)
                            .pay(100000)
                            .stageAddress(stageAddress)
                            .targetGender(MEN)
                            .targetAge(20)
                            .targetNumber(40)
                            .score(4.7)
                            .build();
                } else {
                    host = Host.builder()
                            .user(user)
                            .stageName("xyz")
                            .stageInfo("무대 정보입니다.")
                            .stageCount(10)
                            .openTime(openTime)
                            .closeTime(closeTime)
                            .stageType(CAFE)
                            .stageSize(40.1)
                            .pay(300000)
                            .stageAddress(stageAddress)
                            .targetGender(WOMEN)
                            .targetAge(30)
                            .targetNumber(20)
                            .score(4.4)
                            .build();
                }
                em.persist(host);

                LocalDate startDate1 = LocalDate.of(2022, 11, 1);
                LocalDate endDate1 = LocalDate.of(2022, 11, 5);
                LocalTime startTime1 = LocalTime.of(18, 0);
                LocalTime endTime1 = LocalTime.of(21, 0);

                LocalDate startDate2 = LocalDate.of(2022, 11, 1);
                LocalDate endDate2 = LocalDate.of(2022, 11, 3);
                LocalTime startTime2 = LocalTime.of(12, 0);
                LocalTime endTime2 = LocalTime.of(15, 0);

                for (int j = 0; j < 5; j++) {

                    Post post;
                    if (i < 3) {
                        //60
                        post = Post.builder()
                                .host(host)
                                .startDate(startDate1)
                                .endDate(endDate1)
                                .startTime(startTime1)
                                .endTime(endTime1)
                                .build();
                    } else {
                        //40
                        post = Post.builder()
                                .host(host)
                                .startDate(startDate2)
                                .endDate(endDate2)
                                .startTime(startTime2)
                                .endTime(endTime2)
                                .build();
                    }

                    em.persist(post);
                    if (i % 2 == 0) {
                        PostGenre postGenre = PostGenre.builder()
                                .post(post)
                                .genre(HIPHOP)
                                .build();
                        em.persist(postGenre);
                        post.getPostGenres().add(postGenre);
                    } else {
                        PostGenre postGenre = PostGenre.builder()
                                .post(post)
                                .genre(JAZZ)
                                .build();
                        em.persist(postGenre);
                        post.getPostGenres().add(postGenre);
                    }
                }
            }
        }
    }
}
