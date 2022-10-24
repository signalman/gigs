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

    @Enumerated(EnumType.STRING)
    private Genre genre;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL ) @JoinColumn(name = "hostId")
    private Host host;
    public void setHost(Host host) {
        this.host = host;
        host.getHostGenres().add(this);
    }

}
