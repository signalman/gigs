package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Getter @Setter @Entity
public class Carousel {
    @Id @GeneratedValue
    private Long id;
    private String name;
    @Lob
    private String url;
    @Lob
    private String hyperlink;
}
