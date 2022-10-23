package gigsproject.gigs.service;

import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.HostSpecification;
import gigsproject.gigs.repository.PostRepository;
import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.StageCard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final PostRepository postRepository;

    public List<StageCard> getList(StageSearch stageSearch) {

        /**
         * StageSearch에 들어 있는 필드 값을 바탕으로
         * 이에 해당하는 post를 return하며,
         * StageSearch의 size와 page 값을 바탕으로 querydsl을 적용한 페이징 처리 구현
         */
        List<StageCard> responseList = postRepository.getList(stageSearch).stream()
                .map(post -> new StageCard(post))
                .collect(Collectors.toList());
        log.info("stage name : {}",responseList.get(0).getStageName());
        return responseList;
    }
}
