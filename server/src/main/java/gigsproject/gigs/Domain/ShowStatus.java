package gigsproject.gigs.Domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ShowStatus {
    @Id @GeneratedValue
    private Long id;
    private String status;

}
