package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User extends BaseTimeEntity{
    @Id @GeneratedValue
    private Long userId;
    private String uid;
    private String name;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String phone;

    @Embedded
    private Address address;

    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();
}
