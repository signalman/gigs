package gigsproject.gigs.service;

import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.StarRepository;
import gigsproject.gigs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final StarRepository starRepository;
    private final HostRepository hostRepository;
}
