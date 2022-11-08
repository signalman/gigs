package gigsproject.gigs.request;

import gigsproject.gigs.domain.Role;
import lombok.Data;

@Data
public class SignUpForm {
    private String id;
    private String name;
    private String phoneNumber;
    private String address;
}
