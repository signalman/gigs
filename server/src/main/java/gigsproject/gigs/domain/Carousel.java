package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Carousel {
    @Id @GeneratedValue
    private Long id;
    private String name;
    @Lob
    private String url;
    @Lob
    private String hyperlink;
}
