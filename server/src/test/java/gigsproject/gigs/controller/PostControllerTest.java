package gigsproject.gigs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.Host;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.PostRepository;
import gigsproject.gigs.request.PostSave;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

import static gigsproject.gigs.domain.Genre.ROCK;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class PostControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    HostRepository hostRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DisplayName("포스트 등록 /posts")
    void save() throws Exception {
        //given
        Host host = Host.builder()
                .build();
        hostRepository.save(host);

        PostSave postSave = PostSave.builder()
                .genre(ROCK)
                .startDate(LocalDate.of(2022, 11, 10))
                .endDate(LocalDate.of(2022, 11, 20))
                .startTime(LocalTime.of(18, 0))
                .endTime(LocalTime.of(21, 0))
                .build();

        String request = objectMapper.writeValueAsString(postSave);

        //expected

        mockMvc.perform(post("/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(request))
                .andExpect(status().isOk())
                .andDo(print());

        //then
    }
}