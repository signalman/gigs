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
public class StarRepositoryImpl implements StarRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    public StarRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }
    @Override
    public List<Star> getStarCardList() {
        QUser user = QUser.user;

        List<Star> result = queryFactory
                .select(star)
                .from(star)
                .join(star.user, user).fetchJoin()
                .fetch();
        return result;
    }

}
