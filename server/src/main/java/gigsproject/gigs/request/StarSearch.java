package gigsproject.gigs.request;

import gigsproject.gigs.domain.Address;
import lombok.Data;

import java.util.List;

@Data
public class StarSearch {
    private String name;
    private List<String> stages;
    private List<String> genres;
    private String address;
    private String gender;
}
