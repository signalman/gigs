package gigsproject.gigs.service;

import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.StageType;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.repository.PostRepository;
import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.StageCard;
import gigsproject.gigs.response.StarCard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final PostRepository postRepository;

    public Page<StageCard> getList(StageSearch stageSearch, Pageable pageable) {
        return postRepository.getList(stageSearch, pageable);
    }
}
