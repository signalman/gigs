package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStageImg is a Querydsl query type for StageImg
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStageImg extends EntityPathBase<StageImg> {

    private static final long serialVersionUID = -596340398L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStageImg stageImg = new QStageImg("stageImg");

    public final QHost host;

    public final NumberPath<Long> stageImgId = createNumber("stageImgId", Long.class);

    public final StringPath url = createString("url");

    public QStageImg(String variable) {
        this(StageImg.class, forVariable(variable), INITS);
    }

    public QStageImg(Path<? extends StageImg> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStageImg(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStageImg(PathMetadata metadata, PathInits inits) {
        this(StageImg.class, metadata, inits);
    }

    public QStageImg(Class<? extends StageImg> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.host = inits.isInitialized("host") ? new QHost(forProperty("host"), inits.get("host")) : null;
    }

}

