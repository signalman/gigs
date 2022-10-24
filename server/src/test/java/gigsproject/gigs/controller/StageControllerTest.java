package gigsproject.gigs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.StageType;
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

import java.time.LocalDateTime;

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
                .andExpect(jsonPath("$[1].stageName").value(host.getStageName()))
                .andDo(print());

    }
    @Test
    @DisplayName("무대 조회 (이름 & 무대 타입)")
    void read_name_stageType () throws Exception{
        //given

        StageType stageType1 = new StageType();
        stageType1.setName("bar");
        StageType stageType2 = new StageType();
        stageType2.setName("cafe");


        Host host1 = Host.builder()
                .stageName("abc")
                .stageType(stageType1)
                .build();
        Host host2 = Host.builder()
                .stageName("abc")
                .stageType(stageType2)
                .build();

        Post post1 = Post.builder()
                .host(host1)
                .build();

        Post post2 = Post.builder()
                .host(host2)
                .build();
        postRepository.save(post1);
        postRepository.save(post2);

        mockMvc.perform(MockMvcRequestBuilders.get("/stages?name=abc&stageTypes=cafe")
                        .contentType(APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].stageName").value(host1.getStageName()))
                .andDo(print());
    }

    @Test
    @DisplayName("무대 조회 (무대 타입 & 시간)")
    void read_stageType_time () throws Exception{
        //given

        StageType stageType1 = new StageType();
        stageType1.setName("bar");


        Host host1 = Host.builder()
                .stageName("abc")
                .stageType(stageType1)
                .build();
        Host host2 = Host.builder()
                .stageName("def")
                .stageType(stageType1)
                .build();


        Post post1 = Post.builder()
                .host(host1)
                .showStartTime(LocalDateTime.of(2022, 10, 1, 1, 2))
                .showEndTime(LocalDateTime.of(2022, 10, 1, 5, 6))
                .build();
        Post post2 = Post.builder()
                .host(host2)
                .showStartTime(LocalDateTime.of(2022, 10, 1, 1, 2))
                .showEndTime(LocalDateTime.of(2022, 10, 1, 5, 6))
                .build();
        Post post3 = Post.builder()
                .host(host1)
                .showStartTime(LocalDateTime.of(2021, 9, 1, 1, 2))
                .showEndTime(LocalDateTime.of(2021, 9, 1, 5, 6))
                .build();

        postRepository.save(post1);
        postRepository.save(post2);
        postRepository.save(post3);
        String s = String.valueOf(LocalDateTime.of(2022, 9, 30, 1, 30));
        //2022년 9월 30일 이후의 bar 스테이지 타입의 포스트 조회
        mockMvc.perform(MockMvcRequestBuilders.get("/stages?stageTypes=bar&startTime=" + s)
                        .contentType(APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andDo(print());
    }

    @Test
    @DisplayName("무대 조회 (타겟층 & 무대 타입)")
    void read_target_stageType () throws Exception{
        //given

        Host host1 = Host.builder()
                .stageName("abc")
                .targetNumber(20)
                .targetAge(20)
                .build();
        Host host2 = Host.builder()
                .stageName("def")
                .targetNumber(40)
                .targetAge(10)
                .build();

        Post post1 = Post.builder()
                .host(host1)
                .build();

        Post post2 = Post.builder()
                .host(host2)
                .build();
        postRepository.save(post1);
        postRepository.save(post2);

        mockMvc.perform(MockMvcRequestBuilders.get("/stages?targetMinCount=20")
                        .contentType(APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andDo(print());
    }

}