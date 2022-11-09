package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStarStageType is a Querydsl query type for StarStageType
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStarStageType extends EntityPathBase<StarStageType> {

    private static final long serialVersionUID = -691893287L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStarStageType starStageType = new QStarStageType("starStageType");

    public final EnumPath<StageType> stageType = createEnum("stageType", StageType.class);

    public final QStar star;

    public final NumberPath<Long> starStageTypeId = createNumber("starStageTypeId", Long.class);

    public QStarStageType(String variable) {
        this(StarStageType.class, forVariable(variable), INITS);
    }

    public QStarStageType(Path<? extends StarStageType> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStarStageType(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStarStageType(PathMetadata metadata, PathInits inits) {
        this(StarStageType.class, metadata, inits);
    }

    public QStarStageType(Class<? extends StarStageType> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.star = inits.isInitialized("star") ? new QStar(forProperty("star"), inits.get("star")) : null;
    }

}

