package gigsproject.gigs.service;

import gigsproject.gigs.repository.HostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HostService {

    private final HostRepository hostRepository;



}
