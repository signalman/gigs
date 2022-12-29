package gigsproject.gigs.config.oauth;

import lombok.Getter;

@Getter
public class NotSignedUser {

    private String uid;
    private String uuid;
    private String name;

    NotSignedUser(String uid, String uuid, String name) {
        this.uid = uid;
        this.uuid = uuid;
        this.name = name;
    }

}
