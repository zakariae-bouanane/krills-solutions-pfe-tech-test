package pfe.DTO;

import java.time.LocalDate;

public class FriendDTO {

    public Long id;

    public String name;
    public String firstName;
    public LocalDate dateOfBirth;

    // Constructors (required for Jackson serialization/deserialization)
    public FriendDTO() {
    }

    public FriendDTO(String name, String firstName, LocalDate dateOfBirth) {
        this.name = name;
        this.firstName = firstName;
        this.dateOfBirth = dateOfBirth;
    }
}