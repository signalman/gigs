package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHost is a Querydsl query type for Host
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHost extends EntityPathBase<Host> {

    private static final long serialVersionUID = -535514731L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHost host = new QHost("host");

    public final QBaseTimeEntity _super = new QBaseTimeEntity(this);

    public final NumberPath<Double> avgScore = createNumber("avgScore", Double.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> hostId = createNumber("hostId", Long.class);

    public final ListPath<StageImg, QStageImg> imgs = this.<StageImg, QStageImg>createList("imgs", StageImg.class, QStageImg.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Integer> pay = createNumber("pay", Integer.class);

    public final ListPath<Post, QPost> posts = this.<Post, QPost>createList("posts", Post.class, QPost.class, PathInits.DIRECT2);

    public final StringPath repImg = createString("repImg");

    public final NumberPath<Integer> reviewCount = createNumber("reviewCount", Integer.class);

    public final NumberPath<Integer> showCount = createNumber("showCount", Integer.class);

    public final QAddress stageAddress;

    public final StringPath stageInfo = createString("stageInfo");

    public final StringPath stageName = createString("stageName");

    public final NumberPath<Double> stageSize = createNumber("stageSize", Double.class);

    public final EnumPath<StageType> stageType = createEnum("stageType", StageType.class);

    public final NumberPath<Integer> targetAge = createNumber("targetAge", Integer.class);

    public final EnumPath<Gender> targetGender = createEnum("targetGender", Gender.class);

    public final NumberPath<Integer> targetNumber = createNumber("targetNumber", Integer.class);

    public final QUser user;

    public QHost(String variable) {
        this(Host.class, forVariable(variable), INITS);
    }

    public QHost(Path<? extends Host> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHost(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHost(PathMetadata metadata, PathInits inits) {
        this(Host.class, metadata, inits);
    }

    public QHost(Class<? extends Host> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.stageAddress = inits.isInitialized("stageAddress") ? new QAddress(forProperty("stageAddress")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

