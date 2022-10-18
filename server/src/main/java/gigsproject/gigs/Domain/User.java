package gigsproject.gigs.Domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User {
    @Id @GeneratedValue
    private Long id;
    private String uid;
    private String name;
    private Integer role;
    private String phone;
    private String password;

    @Embedded
    private Address address;
}
