package gigsproject.gigs.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.EnumPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.*;
import gigsproject.gigs.request.StarEdit;
import gigsproject.gigs.request.StarSearch;
import gigsproject.gigs.response.StarCard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

import static gigsproject.gigs.domain.QHost.host;
import static gigsproject.gigs.domain.QStar.star;
import static gigsproject.gigs.domain.StarStatus.ACTIVE;
import static gigsproject.gigs.domain.StarStatus.INACTIVE;
import static java.util.Objects.isNull;
import static org.springframework.util.StringUtils.hasText;

@Repository
public class StarRepositoryImpl implements StarRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public StarRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<StarCard> getStarCardListCond(StarSearch starSearch, Pageable pageable) {
        QUser user = QUser.user;
        QueryResults<Star> results = queryFactory
                .select(star)
                .from(star)
                .join(star.user, user).fetchJoin()
                .where(
                        isStarActive(),
                        starNameEq(starSearch.getName()),
                        starStageTypesEq(starSearch.getStages()),
                        starGenresEq(starSearch.getGenres()),
                        starAddressEq(starSearch.getAddress()),
                        starGenderEq(starSearch.getGender())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<Star> stars = results.getResults();

        List<StarCard> content = stars.stream()
                .map(star -> new StarCard(star))
                .collect(Collectors.toList());
        long total = results.getTotal();

        return new PageImpl<>(content, pageable, total);
    }

    private static BooleanExpression isStarActive() {
        EnumPath<StarStatus> status = star.status;
        status.toString().equals("ACTIVE");
        return star.status.eq(ACTIVE);
    }

    private Predicate starNameEq(String name) {
        return hasText(name) ? star.name.contains(name) : null;
    }

    private Predicate starStageTypesEq(List<StageType> stages) {
        return isNull(stages) ? null : star.starStageTypes.any().stageType.in(stages);
    }

    private Predicate starGenresEq(List<Genre> genres) {//락.인디.R&B
        return isNull(genres) ? null : star.starGenres.any().genre.in(genres);
    }

    private Predicate starAddressEq(String address) {
        return hasText(address) ? star.user.address.siDo.eq(address) : null;
    }

    private Predicate starGenderEq(String gender) {
        return hasText(gender) ? star.gender.eq(Gender.valueOf(gender)) : null;
    }

    //todo - enum으로 enum조회시 문제있음.
    @Override
    public void updateStatus(Long id) {
        StarStatus starStatus = queryFactory
                .select(star.status)
                .from(star)
                .where(star.starId.eq(id))
                .fetchOne();
        if (starStatus.equals(ACTIVE)) {
            queryFactory
                    .update(star)
                    .set(star.status, INACTIVE)
                    .where(star.starId.eq(id))
                    .execute();
        } else {
            queryFactory
                    .update(star)
                    .set(star.status, ACTIVE)
                    .where(star.starId.eq(id))
                    .execute();
        }
    }

    @Override
    public void editStar(StarEdit starEdit) {
        queryFactory
                .update(star)
                .set(star.name, starEdit.getName())
                .set(star.gender, starEdit.getGender())
                .set(star.introduce, starEdit.getIntroduce())
                .set(star.memberNumber, starEdit.getMemberNumber())
                .where(star.starId.eq(starEdit.getStarId()))
                .execute();
    }

    @Override
    public void editStarImg(Long starId, String url) {
        queryFactory
                .update(star)
                .set(star.repImg, url)
                .where(star.starId.eq(starId))
                .execute();
    }

    @Override
    public List<StarCard> findRecentStars() {
        List<Star> stars = queryFactory
                .selectFrom(star)
                .join(star.user, QUser.user).fetchJoin()
                .where(
                        isStarActive().and(star.name.isNotEmpty()).and(star.name.isNotNull())
                )
                .orderBy(star.starId.desc())
                .limit(20)
                .fetch();

        return stars.stream().map(s -> new StarCard(s)).collect(Collectors.toList());
    }

}
