package gigsproject.gigs.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class StageSearch {

    private String name;

    private List<String> stageTypes;

    private List<String> genres;

    private String address;

    private String startTime;
    private String endTime;

    private Integer targetGender;

    private Integer targetAge;

    private Integer targetMinCount;

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
