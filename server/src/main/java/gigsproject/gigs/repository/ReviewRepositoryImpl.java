package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.Review;
import gigsproject.gigs.response.ReviewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static gigsproject.gigs.domain.QReview.review;

@Repository
@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<ReviewDto> getListByScoreDesc(Pageable pageable) {
        List<Review> fetch = jpaQueryFactory.selectFrom(review)
                .where(review.content.ne(""))
                .orderBy(review.score.desc(), review.reviewId.desc())
                .fetch();

        List<ReviewDto> content = fetch.stream()
                .map(f -> new ReviewDto(f))
                .collect(Collectors.toList());

        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(review.count())
                .from(review)
                .where(
                        review.content.ne("")
                );
        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }
}
