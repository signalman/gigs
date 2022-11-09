package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCarousel is a Querydsl query type for Carousel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCarousel extends EntityPathBase<Carousel> {

    private static final long serialVersionUID = -1899602227L;

    public static final QCarousel carousel = new QCarousel("carousel");

    public final NumberPath<Long> carouselId = createNumber("carouselId", Long.class);

    public final StringPath hyperlink = createString("hyperlink");

    public final StringPath name = createString("name");

    public final StringPath url = createString("url");

    public QCarousel(String variable) {
        super(Carousel.class, forVariable(variable));
    }

    public QCarousel(Path<? extends Carousel> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCarousel(PathMetadata metadata) {
        super(Carousel.class, metadata);
    }

}

