package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class StageImg {
    @Id @GeneratedValue
    private Long id;

    private String url;

    @ManyToOne @JoinColumn(name = "id")
    private Host host;



}
