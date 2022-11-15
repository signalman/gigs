package gigsproject.gigs.response;

import gigsproject.gigs.domain.Address;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.User;
import lombok.Data;

@Data
public class UserDto {
    //유저 개인 정보
    private String uid;
    private String name;
    private Address address;
    private String phoneNumber;
    private Role role;

    public UserDto(User user) {
        this.uid = user.getUid();
        this.name = user.getName();
        this.address = user.getAddress();
        this.phoneNumber = user.getPhone();
        this.role = user.getRole();
    }
}
