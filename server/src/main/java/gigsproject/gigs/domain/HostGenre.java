package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Setter
public class HostGenre {
    @Id @GeneratedValue
    private Long postGenreId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL ) @JoinColumn(name = "genreId")
    private Genre genre;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL ) @JoinColumn(name = "hostId")
    private Host host;
}
