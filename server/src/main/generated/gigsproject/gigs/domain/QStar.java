package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStar is a Querydsl query type for Star
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStar extends EntityPathBase<Star> {

    private static final long serialVersionUID = -535182785L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStar star = new QStar("star");

    public final QBaseTimeEntity _super = new QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final EnumPath<Gender> gender = createEnum("gender", Gender.class);

    public final StringPath introduce = createString("introduce");

    public final NumberPath<Integer> memberNumber = createNumber("memberNumber", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath name = createString("name");

    public final ListPath<Proposal, QProposal> proposals = this.<Proposal, QProposal>createList("proposals", Proposal.class, QProposal.class, PathInits.DIRECT2);

    public final StringPath repImg = createString("repImg");

    public final ListPath<Review, QReview> reviews = this.<Review, QReview>createList("reviews", Review.class, QReview.class, PathInits.DIRECT2);

    public final NumberPath<Double> score = createNumber("score", Double.class);

    public final NumberPath<Integer> showCount = createNumber("showCount", Integer.class);

    public final ListPath<StarGenre, QStarGenre> starGenres = this.<StarGenre, QStarGenre>createList("starGenres", StarGenre.class, QStarGenre.class, PathInits.DIRECT2);

    public final NumberPath<Long> starId = createNumber("starId", Long.class);

    public final ListPath<StarImg, QStarImg> starImgs = this.<StarImg, QStarImg>createList("starImgs", StarImg.class, QStarImg.class, PathInits.DIRECT2);

    public final ListPath<StarStageType, QStarStageType> starStageTypes = this.<StarStageType, QStarStageType>createList("starStageTypes", StarStageType.class, QStarStageType.class, PathInits.DIRECT2);

    public final EnumPath<StarStatus> status = createEnum("status", StarStatus.class);

    public final QUser user;

    public QStar(String variable) {
        this(Star.class, forVariable(variable), INITS);
    }

    public QStar(Path<? extends Star> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStar(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStar(PathMetadata metadata, PathInits inits) {
        this(Star.class, metadata, inits);
    }

    public QStar(Class<? extends Star> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

