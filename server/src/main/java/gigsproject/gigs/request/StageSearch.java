package gigsproject.gigs.request;

import gigsproject.gigs.domain.Gender;
import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.StageType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class StageSearch {

    private String name;

    private List<StageType> stageTypes = new ArrayList<>();
    private List<Genre> genres = new ArrayList<>();

    private String address;

    private String startTime;
    private String endTime;

    private Gender targetGender;

    private Integer targetAge;

    private Integer targetMinCount;

//    public void setStageTypes(List<String> stageTypes) {
//        for (String stageType : stageTypes) {
//            StageType valueOf = StageType.valueOf(stageType);
//            this.stageTypes.add(valueOf);
//        }
//    }
//
//    public void setGenres(List<String> genres) {
//        for (String genre : genres) {
//            Genre valueOf = Genre.valueOf(genre);
//            this.genres.add(valueOf);
//        }
//    }
//
////    public void setTargetGender(String targetGender) {
////        this.targetGender = Gender.valueOf(targetGender);
////    }

    /**
     * page 와 size 정보
     */
    private Integer page;
    private Integer size;
    private static final int MAX_SIZE = 2000;

    @Builder
    public StageSearch(Integer page, Integer size) {
        this.page = (page== null) ? 1 : page;
        this.size = (size== null) ? 10 : size;
    }
    public long getOffset() {
        return (long) Math.max(0, (page - 1)) * Math.min(size, MAX_SIZE);
    }
}
