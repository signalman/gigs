package gigsproject.gigs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.request.StageForm;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.TestExecutionEvent;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
class StageControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    HostRepository hostRepository;
    @Autowired
    EntityManager em;


    /**
     * "hostId": 761,
     * "imgUrl": "empty",
     * "name": "qweryy",
     * "address": {
     * "siDo": "경기도 용인시",
     * "siGun": "수지구",
     * "road": "경기도 용인시 수지구 풍덕천로 41길 5",
     * "detail": "222동 333호"
     * },
     * "stageSize": 70,
     * "targetGender": "WOMEN",
     * "targetAge": 30,
     * "openTime": "17:00:00",
     * "closeTime": "23:00:00",
     * "targetMinCount": 30,
     * "pay": 50000,
     * "stageType": "BAR",
     * "score": 4.3,
     * "showCount": 46,
     * "reviewCount": 22
     */
    @BeforeEach
    void setup() {
        User user = User.builder()
                .name("test")
                .role(Role.ROLE_HOST)
                .build();
        em.persist(user);

    }

    @Test
    @DisplayName("무대 수정 테스트")
    @WithUserDetails(value = "test", setupBefore = TestExecutionEvent.TEST_EXECUTION)
    void save () throws Exception{
        //given
        StageForm stageForm = StageForm.builder()
                .stageName("수정된 이름입니다.")
                .stageInfo("수정된 내용입니다.")
                .build();
        String request = objectMapper.writeValueAsString(stageForm);

        //expected
        mockMvc.perform(post("/stages")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isOk())
                .andDo(print());


    }
}