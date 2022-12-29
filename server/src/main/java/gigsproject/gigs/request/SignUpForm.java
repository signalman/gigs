package gigsproject.gigs.request;

import gigsproject.gigs.domain.Role;
import lombok.Data;

@Data
public class SignUpForm {
//    id, name, siDo, siGun, road, detail, phoneNumber, role
    private String uid;
    private String name;
    private String siDo;
    private String siGun;
    private String road;
    private String detail;
    private String phoneNumber;
    private Role role;
}
