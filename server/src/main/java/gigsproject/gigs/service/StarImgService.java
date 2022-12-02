package gigsproject.gigs.service;

import gigsproject.gigs.domain.StarImg;
import gigsproject.gigs.repository.StarImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StarImgService {
    private final StarImgRepository starImgRepository;

    public void save(StarImg starImg) {
        starImgRepository.save(starImg);
    }

    public void deleteImg(Long id) {
        starImgRepository.deleteById(id);
    }
}
