package gigsproject.gigs.repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.QProposal;
import gigsproject.gigs.domain.ShowStatus;
import gigsproject.gigs.response.History;
import gigsproject.gigs.response.ProposalDto;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import static gigsproject.gigs.domain.QHost.host;
import static gigsproject.gigs.domain.QProposal.proposal;
import static gigsproject.gigs.domain.QStar.star;

@RequiredArgsConstructor
public class ProposalRepositoryImpl implements ProposalRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<History> findStarHistory(Long starId) {
        QProposal proposal = QProposal.proposal;
        List<Proposal> results = queryFactory
                .select(proposal)
                .from(proposal)
                .join(proposal.star, star)
                .where(
                        isComp(),
                        starIdEq(starId)
                )
                .fetch();

        List<History> histories = results.stream().map(p -> new History(p)).collect(Collectors.toList());
        return histories;
    }

    private Predicate isComp() {
        return proposal.showStatus.eq(ShowStatus.COMP);
    }

    private Predicate starIdEq(Long starId) {
        return proposal.star.starId.eq(starId);
    }


    @Override
    public List<History> findHostHistory(Long hostId) {
        QProposal proposal = QProposal.proposal;
        List<Proposal> results = queryFactory
                .select(proposal)
                .from(proposal)
                .join(proposal.post.host, host)
                .where(
                        isComp(),
                        hostIdEq(hostId)
                )
                .fetch();
        List<History> histories = results.stream().map(p -> new History(p)).collect(Collectors.toList());
        return histories;
    }

    private Predicate hostIdEq(Long hostId) {
        return proposal.post.host.hostId.eq(hostId);
    }

    @Override
    public List<ProposalDto> findNotCompProposals(Long hostId) {
        QProposal proposal = QProposal.proposal;

        List<Proposal> results = queryFactory
                .select(proposal)
                .from(proposal)
                .join(proposal.post.host, host)
                .where(
                        isNotComp(),
                        hostIdEq(hostId)
                )
                .fetch();
        List<ProposalDto> proposals = results.stream().map(p -> new ProposalDto(p)).collect(Collectors.toList());
        return proposals;
    }

    private Predicate isNotComp() {
        return proposal.showStatus.in(ShowStatus.UNSIGNED, ShowStatus.SIGNED);
    }

}
