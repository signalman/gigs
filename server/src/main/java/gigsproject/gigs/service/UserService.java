package gigsproject.gigs.service;

import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.domain.User;
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

    //todo - 주소 아직 구현안함. 이후 넣어줘야함.
    public void createUser(SignUpForm signUpForm){
        //받아온 폼을 가지고 유저 저장.
        User user = User.builder()
                .name(signUpForm.getName())
                .uid(signUpForm.getId())
//                .role(signUpForm.getRole())
                .phone(signUpForm.getPhoneNumber())
                .build();
        User savedUser = userRepository.save(user);

        //유저가 host를 선택했다면 host 테이블에도 저장.
//        if (signUpForm.getRole() == Role.HOST) {
//            Host host = Host.builder()
//                    .user(user)
//                    .build();
//            hostRepository.save(host);
//        }
//        //유저가 star를 선택했다면 star 테이블에도 저장.
//        else{
//            Star star = Star.builder()
//                    .user(user)
//                    .build();
//            starRepository.save(star);
//        }

    }
}
