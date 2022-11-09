package gigsproject.gigs.config.oauth;

import lombok.Getter;

@Getter
public class NotSignedUser {

    private String id;
    private String uuid;
    private String name;

    NotSignedUser(String id, String uuid, String name) {
        this.id = id;
        this.uuid = uuid;
        this.name = name;
    }

}
