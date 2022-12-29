package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStarImg is a Querydsl query type for StarImg
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStarImg extends EntityPathBase<StarImg> {

    private static final long serialVersionUID = -711671548L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStarImg starImg = new QStarImg("starImg");

    public final QStar star;

    public final NumberPath<Long> starImgId = createNumber("starImgId", Long.class);

    public final StringPath url = createString("url");

    public QStarImg(String variable) {
        this(StarImg.class, forVariable(variable), INITS);
    }

    public QStarImg(Path<? extends StarImg> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStarImg(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStarImg(PathMetadata metadata, PathInits inits) {
        this(StarImg.class, metadata, inits);
    }

    public QStarImg(Class<? extends StarImg> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.star = inits.isInitialized("star") ? new QStar(forProperty("star"), inits.get("star")) : null;
    }

}

