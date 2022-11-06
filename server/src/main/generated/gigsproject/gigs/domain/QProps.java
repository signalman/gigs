package gigsproject.gigs.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QProps is a Querydsl query type for Props
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProps extends EntityPathBase<Props> {

    private static final long serialVersionUID = 586386211L;

    public static final QProps props = new QProps("props");

    public final StringPath name = createString("name");

    public final NumberPath<Long> propsId = createNumber("propsId", Long.class);

    public QProps(String variable) {
        super(Props.class, forVariable(variable));
    }

    public QProps(Path<? extends Props> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProps(PathMetadata metadata) {
        super(Props.class, metadata);
    }

}

