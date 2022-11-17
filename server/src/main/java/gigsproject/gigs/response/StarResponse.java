package gigsproject.gigs.response;

import gigsproject.gigs.domain.Gender;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.domain.StarImg;
import gigsproject.gigs.domain.StarStatus;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class StarResponse {
    private Long starId;
    private String name;
    private Gender gender;
    private Integer memberNumber;
    private String introduce;
    private Integer showCount;
    private StarStatus status;
    private Double score;

    private List<StarStageTypeDto> starStageTypes;
    private List<StarGenreDto> starGenres;
    private List<StarImg> starImgs;
    private List<ReviewDto> reviews;
    private List<ProposalDto> proposals;

    public StarResponse(Star star) {
        this.starId = star.getStarId();
        this.name = star.getName();
        this.gender = star.getGender();
        this.memberNumber = star.getMemberNumber();
        this.introduce = star.getIntroduce();
        this.showCount = star.getShowCount();
        this.score = star.getScore();
        this.starStageTypes = star.getStarStageTypes().stream()
                .map(s -> new StarStageTypeDto(s)).collect(Collectors.toList());
        this.starGenres = star.getStarGenres().stream()
                .map(s -> new StarGenreDto(s)).collect(Collectors.toList());
        this.starImgs = star.getStarImgs();
        this.reviews = star.getReviews().stream()
                .map(r -> new ReviewDto(r)).collect(Collectors.toList());
        this.proposals = star.getProposals().stream()
                .map(p -> new ProposalDto(p)).collect(Collectors.toList());
    }
}
