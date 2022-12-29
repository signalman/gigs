package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.repository.*;
import gigsproject.gigs.request.SignUpForm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final StarRepository starRepository;
    private final HostRepository hostRepository;

    @Transactional
    public void createUser(SignUpForm signUpForm) {
        //Address 객체 생성
        Address address = new Address(signUpForm.getSiDo(), signUpForm.getSiGun(), signUpForm.getRoad(), signUpForm.getDetail());

        //받아온 폼을 가지고 유저 저장.
        User user = User.builder()
                .uid(signUpForm.getUid())
                .name(signUpForm.getName())
                .address(address)
                .phone(signUpForm.getPhoneNumber())
                .role(signUpForm.getRole())
                .build();
        userRepository.save(user);

//        유저가 host를 선택했다면 host 테이블에도 저장.
        if (signUpForm.getRole() == Role.ROLE_HOST) {
            Host host = Host.builder()
                    .user(user)
                    .stageName("")
                    .stageInfo("")
                    .repImg("")
                    .targetGender(Gender.DEFAULT)
                    .targetAge(0)
                    .targetNumber(0)
                    .build();
            hostRepository.save(host);
        }
        //유저가 star를 선택했다면 star 테이블에도 저장.
        else {
            Star star = Star.builder()
                    .user(user)
                    .name("")
                    .score(0D)
                    .introduce("")
                    .status(StarStatus.INACTIVE)
                    .repImg("")
                    .gender(Gender.DEFAULT)
                    .memberNumber(1)
                    .showCount(0)
                    .build();
            starRepository.save(star);
        }
    }
}
