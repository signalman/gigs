package gigsproject.gigs.request;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class StageSearch {

    private String name;

    private final List<String> stageTypes = new ArrayList<>();

    private final List<String> genres = new ArrayList<>();

    private String address;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

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
