package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProposal is a Querydsl query type for Proposal
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProposal extends EntityPathBase<Proposal> {

    private static final long serialVersionUID = 1399613535L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProposal proposal = new QProposal("proposal");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final QPost post;

    public final NumberPath<Long> proposalId = createNumber("proposalId", Long.class);

    public final QReview review;

    public final DateTimePath<java.time.LocalDateTime> showEndTime = createDateTime("showEndTime", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> showStartTime = createDateTime("showStartTime", java.time.LocalDateTime.class);

    public final EnumPath<ShowStatus> showStatus = createEnum("showStatus", ShowStatus.class);

    public final QStar star;

    public QProposal(String variable) {
        this(Proposal.class, forVariable(variable), INITS);
    }

    public QProposal(Path<? extends Proposal> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProposal(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProposal(PathMetadata metadata, PathInits inits) {
        this(Proposal.class, metadata, inits);
    }

    public QProposal(Class<? extends Proposal> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.post = inits.isInitialized("post") ? new QPost(forProperty("post"), inits.get("post")) : null;
        this.review = inits.isInitialized("review") ? new QReview(forProperty("review"), inits.get("review")) : null;
        this.star = inits.isInitialized("star") ? new QStar(forProperty("star"), inits.get("star")) : null;
    }

}

