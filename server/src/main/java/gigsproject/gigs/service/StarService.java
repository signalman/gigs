package gigsproject.gigs.service;

import gigsproject.gigs.repository.StarRepository;
import gigsproject.gigs.response.StarCard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StarService {
    private final StarRepository starRepository;

    public List<StarCard> getStarCardList() {
        return List.of();
    }
}
