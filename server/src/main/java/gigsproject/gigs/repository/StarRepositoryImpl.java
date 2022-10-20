package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.*;
import gigsproject.gigs.response.StarCard;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static gigsproject.gigs.domain.QStar.star;
import static gigsproject.gigs.domain.QStarGenre.*;

@Repository
//@RequiredArgsConstructor
public class StarRepositoryImpl implements StarRepositoryCustom{
//    private final EntityManager em;

    private final JPAQueryFactory queryFactory;
    public StarRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }
    @Override
    public List<Star> getStarCardList() {
        QStarGenre starGenre = QStarGenre.starGenre;
        QStarImg starImg = QStarImg.starImg;
        QUser user = QUser.user;
        QStarStageType starStageType = QStarStageType.starStageType;

        List<Star> result = queryFactory
                .select(star)
                .from(star)
                .join(star.user, user).fetchJoin()
                .fetch();
        return result;
    }

//    public List<Star> getStarCardList(){
//        return em.createQuery(
//                "select s from Star s", Star.class)
//                .getResultList();
//    }

}
