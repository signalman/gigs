package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Host;
import org.springframework.data.jpa.domain.Specification;

public class HostSpecification {

    public static Specification<Host> equalStageName(String stageName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("stageName"), stageName);
    }
}
