package gigsproject.gigs.service;

import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;
    public void save(Genre genre){
        genreRepository.save(genre);
    }
}
