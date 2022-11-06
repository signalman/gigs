package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStageProps is a Querydsl query type for StageProps
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStageProps extends EntityPathBase<StageProps> {

    private static final long serialVersionUID = -1845847233L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStageProps stageProps = new QStageProps("stageProps");

    public final QHost host;

    public final QProps props;

    public final NumberPath<Long> stagePropsId = createNumber("stagePropsId", Long.class);

    public QStageProps(String variable) {
        this(StageProps.class, forVariable(variable), INITS);
    }

    public QStageProps(Path<? extends StageProps> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStageProps(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStageProps(PathMetadata metadata, PathInits inits) {
        this(StageProps.class, metadata, inits);
    }

    public QStageProps(Class<? extends StageProps> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.host = inits.isInitialized("host") ? new QHost(forProperty("host"), inits.get("host")) : null;
        this.props = inits.isInitialized("props") ? new QProps(forProperty("props")) : null;
    }

}

