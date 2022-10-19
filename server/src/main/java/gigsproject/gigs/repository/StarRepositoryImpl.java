package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.response.StarCard;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

import static gigsproject.gigs.domain.QStar.star;

@RequiredArgsConstructor
public class StarRepositoryImpl implements StarRepositoryCustom{

    private final JPAQueryFactory queryFactory;


    public StarRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public List<StarCard> getStarCardList() {
        List<StarCard> result = queryFactory
                .select()
                .from(star)
                .join(star)

        return null;
    }
}
