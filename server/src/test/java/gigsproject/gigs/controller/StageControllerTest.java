package gigsproject.gigs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class StageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    PostRepository postRepository;

    @Autowired
    HostRepository hostRepository;

    @BeforeEach
    void clean() {
        postRepository.deleteAll();
    }

    @Test
    @DisplayName("무대 조회 (전체)")
    void read_all () throws Exception{
        //given

        Host host = Host.builder()
                .stageName("abc")
                .build();

        Post post1 = Post.builder()
                .host(host)
                .build();
        Post post2 = Post.builder()
                .host(host)
                .build();
        postRepository.save(post1);
        postRepository.save(post2);

        //expected
        mockMvc.perform(MockMvcRequestBuilders.get("/stages")
                        .contentType(APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].stageName").value(host.getStageName()))
                .andDo(print());
    }

    @Test
    @DisplayName("무대 조회 (이름)")
    void read_name () throws Exception{
        //given

        Host host = Host.builder()
                .stageName("abc")
                .build();

        Post post1 = Post.builder()
                .host(host)
                .build();
        Post post2 = Post.builder()
                .host(host)
                .build();
        postRepository.save(post1);
        postRepository.save(post2);


        //expected
        mockMvc.perform(MockMvcRequestBuilders.get("/stages?name=abc")
                        .contentType(APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].stageName").value(host.getStageName()))
                .andDo(print());

    }



}