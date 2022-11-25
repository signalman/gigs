package gigsproject.gigs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.request.StageForm;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.test.context.support.TestExecutionEvent;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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

    @MockBean
    UserDetailsService userDetailsService;

    private Host host;
    private User user;

    @BeforeEach
    void setup() {
        user = User.builder()
                .name("test")
                .role(Role.ROLE_HOST)
                .build();
        em.persist(user);

        host = Host.builder()
                .user(user)
                .stageName("기존 제목")
                .build();

        em.persist(host);

    }

    @Test
    @DisplayName("무대 수정 테스트")
    @WithUserDetails(value = "test", setupBefore = TestExecutionEvent.TEST_EXECUTION)
    void save() throws Exception {
        //given
        UserDetails userDetails = userDetailsService.loadUserByUsername("test");
        Host host = hostRepository.findByUser(user);

        StageForm stageForm = StageForm.builder()
                .name("수정된 이름입니다.")
                .introduce("수정된 내용입니다.")
                .build();
        String request = objectMapper.writeValueAsString(stageForm);

        //expected
        MvcResult mvcResult = mockMvc.perform(put("/stages")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        Assertions.assertThat(content).isEqualTo(host.getHostId() + ": 수정완료");

    }
}