package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPostGenre is a Querydsl query type for PostGenre
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPostGenre extends EntityPathBase<PostGenre> {

    private static final long serialVersionUID = -1162898186L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPostGenre postGenre = new QPostGenre("postGenre");

    public final EnumPath<Genre> genre = createEnum("genre", Genre.class);

    public final QPost post;

    public final NumberPath<Long> postGenreId = createNumber("postGenreId", Long.class);

    public QPostGenre(String variable) {
        this(PostGenre.class, forVariable(variable), INITS);
    }

    public QPostGenre(Path<? extends PostGenre> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPostGenre(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPostGenre(PathMetadata metadata, PathInits inits) {
        this(PostGenre.class, metadata, inits);
    }

    public QPostGenre(Class<? extends PostGenre> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.post = inits.isInitialized("post") ? new QPost(forProperty("post"), inits.get("post")) : null;
    }

}

