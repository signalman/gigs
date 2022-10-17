package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class User {
    @Id @GeneratedValue
    private Long id;
    private String uid;
    private String name;
    private Integer role;
    private String phone;
    private String password;
    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "id")
    private Address address;
}
