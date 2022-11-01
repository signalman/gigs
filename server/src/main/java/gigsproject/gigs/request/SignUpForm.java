package gigsproject.gigs.request;

import gigsproject.gigs.domain.Role;
import lombok.Data;

@Data
public class SignUpForm {
    private String uid;
    private String name;
    private Role role;


}
