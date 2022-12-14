package gigsproject.gigs.service;

import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.ShowStatus;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.repository.ProposalRepository;
import gigsproject.gigs.request.ProposalForm;
import gigsproject.gigs.response.ProposalDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static gigsproject.gigs.domain.ShowStatus.UNSIGNED;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ProposalService {
    private final ProposalRepository proposalRepository;

    public List<ProposalDto> findUnsignedOrRejected(Long starId) {
        return proposalRepository.findUnsignedOrRejected(starId);
    }

    public List<ProposalDto> findUnsigned(Long hostId) {
        return proposalRepository.findUnsigned(hostId);
    }

    public List<ProposalDto> findSignedOrCompStar(Long starId) {
        return proposalRepository.findSignedOrCompStar(starId);
    }

    public List<ProposalDto> findSignedOrCompHost(Long hostId) {
        return proposalRepository.findSignedOrCompHost(hostId);
    }

    @Transactional
    public Proposal save(ProposalForm proposalForm, Star star, Post post) {

        Proposal proposal = Proposal.builder()
                .content(proposalForm.getContent())
                .star(star)
                .post(post)
                .createdAt(LocalDateTime.now())
                .showStartTime(post.getDate().atTime(post.getStartTime())) //localDateTime
                .showEndTime(post.getDate().atTime(post.getEndTime()))
                .showStatus(UNSIGNED)
                .build();
        return proposalRepository.save(proposal);
    }

    @Transactional
    public void delete(Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId).orElseThrow(
                () -> new IllegalArgumentException("해당 제안서가 존재하지 않습니다.")
        );
        proposalRepository.delete(proposal);
    }

    @Transactional
    public void changeStatus(Long proposalId, String status) {
        Proposal proposal = proposalRepository.findById(proposalId).orElseThrow(
                () -> new IllegalArgumentException("해당 제안서가 존재하지 않습니다.")
        );

        log.info("******* proposal id : {} , proposal status : {} *******", proposal.getProposalId(), proposal.getShowStatus());

        proposal.editStatus(status);


        /***************************************/
//        if (status.equals("accept")) {
//            proposalRepository.updateToSigned(proposal);
//        } else if (status.equals("reject")) {
//            proposalRepository.updateToRejected(proposal);
//        }
    }

    public Proposal findById(Long proposalId) {
        return proposalRepository.findById(proposalId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 제안서가 존재하지 않습니다."));
    }
}
