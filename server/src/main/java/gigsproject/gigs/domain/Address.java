package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Address {

    private String siDo;
    private String siGun;
    private String road;
    private String detail;
}
