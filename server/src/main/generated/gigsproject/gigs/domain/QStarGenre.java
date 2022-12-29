package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStarGenre is a Querydsl query type for StarGenre
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStarGenre extends EntityPathBase<StarGenre> {

    private static final long serialVersionUID = -1018632572L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStarGenre starGenre = new QStarGenre("starGenre");

    public final EnumPath<Genre> genre = createEnum("genre", Genre.class);

    public final QStar star;

    public final NumberPath<Long> starGenreId = createNumber("starGenreId", Long.class);

    public QStarGenre(String variable) {
        this(StarGenre.class, forVariable(variable), INITS);
    }

    public QStarGenre(Path<? extends StarGenre> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStarGenre(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStarGenre(PathMetadata metadata, PathInits inits) {
        this(StarGenre.class, metadata, inits);
    }

    public QStarGenre(Class<? extends StarGenre> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.star = inits.isInitialized("star") ? new QStar(forProperty("star"), inits.get("star")) : null;
    }

}

