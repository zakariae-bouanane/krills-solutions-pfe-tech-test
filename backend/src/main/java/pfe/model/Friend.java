package pfe.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;

@Entity
public class Friend extends PanacheEntity {

    // Fields from the Exigence fonctionnelle
    public String name;
    public String firstName;
    public LocalDate dateOfBirth; // date de naissance

    // Exigence de sécurité: ensures the friend belongs to a specific user
    public String userId; // The unique ID/Principle from the JWT token

    /**
     * Calculates the date of the next birthday for sorting.
     * This logic is necessary for the chronological sorting requirement.
     * @return The LocalDate of the next birthday.
     */
    public LocalDate getNextBirthday() {
        LocalDate today = LocalDate.now();
        int currentYear = today.getYear();

        // Start with the birthday in the current year
        LocalDate nextBirthday = dateOfBirth.withYear(currentYear);

        // If the birthday already passed this year, set it for next year
        if (nextBirthday.isBefore(today)) {
            nextBirthday = nextBirthday.plusYears(1);
        }
        return nextBirthday;
    }

    /**
     * Static helper method to find all friends for a given user,
     * sorted by their next upcoming birthday (chronological order).
     * @param userId The ID of the authenticated user.
     * @return A list of Friends, sorted.
     */
    public static List<Friend> findUpcomingBirthdays(String userId) {
        // 1. Find all friends for the user
        List<Friend> friends = list("userId", userId);

        // 2. Sort the list by the calculated 'nextBirthday' date
        friends.sort(Comparator.comparing(Friend::getNextBirthday));

        return friends;
    }
}