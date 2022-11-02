package gigsproject.gigs.request;

import gigsproject.gigs.domain.Role;
import lombok.Data;

@Data
public class SignUpForm {
    private String uid;
    private String name;
    private Role role;
    private String phone;
    private String password;
    //todo - 주소 구현해야함.


}
