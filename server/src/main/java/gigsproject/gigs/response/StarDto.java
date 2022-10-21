package gigsproject.gigs.response;

import gigsproject.gigs.domain.*;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
public class StarDto {
        private Long starId;
        private String name;
        private String gender;
        private Integer memberNumber;
        private String introduce;
        private Integer showCount;
        private Boolean status;
        private Double score;
    public StarDto(Star star){
        this.starId = star.getStarId();
        this.name = star.getName();
        this.gender = star.getGender();
        this.memberNumber = star.getMemberNumber();
        this.introduce = star.getIntroduce();
        this.showCount = star.getShowCount();
        this.status = star.getStatus();
        this.score = star.getScore();
    }
}
