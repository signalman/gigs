package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;

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
    private String password;

    @Embedded
    private Address address;
}
