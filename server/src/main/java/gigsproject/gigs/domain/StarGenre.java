package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StarGenre {
    @Id
    @GeneratedValue
    private Long starGenreId;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "starId")
    private Star star;
    @Enumerated(EnumType.STRING)
    private Genre genre;

    /**
     * 연관관계 편의 메소드 추가
     */
    public void setStar(Star star) {
        this.star = star;
        star.getStarGenres().add(this);
    }
}
