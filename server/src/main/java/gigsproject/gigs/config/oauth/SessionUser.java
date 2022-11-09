package gigsproject.gigs.config.oauth;

import gigsproject.gigs.domain.User;
import lombok.Getter;
import lombok.Setter;

@Getter
public class SessionUser {
    private Long id;
    private String name;

    public SessionUser(User user){
        this.id = user.getUserId();
        this.name = user.getName();
    }
}
