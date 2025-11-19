package pfe.service;

import pfe.model.User;
import pfe.repository.UserRepository;
import pfe.Provider.*;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.annotation.PostConstruct;
import at.favre.lib.crypto.bcrypt.BCrypt;

import java.time.Duration;


@ApplicationScoped
public class AuthService {

    @Inject
    UserRepository userRepository;

    @Inject
    ITokenProvider provider;

    @PostConstruct
    public void init() {
        createUserIfNotExists();
    }

    public String login(String username, String password) {

        User user = userRepository.findByUsername(username);

        if (user == null) {
            return null;
        }

        String jwt = provider.GenerateToken(password, user, username);

        if (jwt == null) {
            return null;
        }

        return jwt;
    }

    // JUST FOR TESTING !!
    // this will create a default user
    @Transactional
    public void createUserIfNotExists() {
        if (userRepository.findByUsername("admin") == null) {
            User u = new User();
            u.username = "admin";
            u.passwordHash = BCrypt.withDefaults()
                    .hashToString(12, "admin".toCharArray());
            u.role = "admin";
            userRepository.persist(u);
        }
    }
}
