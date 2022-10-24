package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public enum ShowStatus {

    COMP,    //공연완료
    SIGNED,  //제안서 체결
    UNSIGNED //제안서 미체결
}
