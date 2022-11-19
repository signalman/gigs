package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.StarRepository;
import gigsproject.gigs.repository.UserRepository;
import gigsproject.gigs.request.SignUpForm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final StarRepository starRepository;
    private final HostRepository hostRepository;

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
                    .build();
            hostRepository.save(host);
        }
        //유저가 star를 선택했다면 star 테이블에도 저장.
        else {
            Star star = Star.builder()
                    .user(user)
                    .status(StarStatus.INACTIVE)
                    .build();
            starRepository.save(star);
        }
    }


}
