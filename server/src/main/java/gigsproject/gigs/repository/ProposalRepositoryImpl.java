package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.QProposal;
import gigsproject.gigs.domain.ShowStatus;
import gigsproject.gigs.response.ProposalDto;
import gigsproject.gigs.response.SignedOrCompDto;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import static gigsproject.gigs.domain.QHost.host;
import static gigsproject.gigs.domain.QStar.star;

@RequiredArgsConstructor
public class ProposalRepositoryImpl implements ProposalRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ProposalDto> findUnsignedOrRejected(Long starId) {
        QProposal proposal = QProposal.proposal;
        List<Proposal> results = queryFactory
                .select(proposal)
                .from(proposal)
                .join(proposal.star, star)
                .where(
                        proposal.star.starId.eq(starId),
                        proposal.showStatus.in(ShowStatus.UNSIGNED, ShowStatus.REJECTED)
                )
                .fetch();
        return results.stream().map(p -> new ProposalDto(p)).collect(Collectors.toList());
    }

    @Override
    public List<ProposalDto> findUnsigned(Long hostId) {
        QProposal proposal = QProposal.proposal;
        List<Proposal> results = queryFactory
                .select(proposal)
                .from(proposal)
                .join(proposal.post.host, host)
                .where(
                        proposal.post.host.hostId.eq(hostId),
                        proposal.showStatus.eq(ShowStatus.UNSIGNED)
                )
                .fetch();
        return results.stream().map(p -> new ProposalDto(p)).collect(Collectors.toList());
    }

    @Override
    public List<SignedOrCompDto> findSignedOrCompStar(Long starId) {
        QProposal proposal = QProposal.proposal;
        List<Proposal> results = queryFactory
                .select(proposal)
                .from(proposal)
                .join(proposal.star, star)
                .where(
                        proposal.star.starId.eq(starId),
                        proposal.showStatus.in(ShowStatus.SIGNED, ShowStatus.COMP)
                )
                .fetch();
        return results.stream().map(p -> new SignedOrCompDto(p)).collect(Collectors.toList());
    }

    @Override
    public List<SignedOrCompDto> findSignedOrCompHost(Long hostId) {
        QProposal proposal = QProposal.proposal;
        List<Proposal> results = queryFactory
                .selectFrom(proposal)
                .join(proposal.post.host, host)
                .where(
                        proposal.post.host.hostId.eq(hostId),
                        proposal.showStatus.in(ShowStatus.SIGNED, ShowStatus.COMP)
                )
                .fetch();
        return results.stream().map(p -> new SignedOrCompDto(p)).collect(Collectors.toList());
    }


    @Override
    public void updateToSigned(Proposal proposal) {
        QProposal qProposal = QProposal.proposal;
        queryFactory
                .update(qProposal)
                .set(qProposal.showStatus, ShowStatus.SIGNED)
                .where(qProposal.eq(proposal));
    }

    @Override
    public void updateToRejected(Proposal proposal) {
        QProposal qProposal = QProposal.proposal;
        queryFactory
                .update(qProposal)
                .set(qProposal.showStatus, ShowStatus.REJECTED)
                .where(qProposal.eq(proposal));
    }
}
