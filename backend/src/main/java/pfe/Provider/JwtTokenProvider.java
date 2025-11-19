package pfe.Provider;

import java.lang.Override;
import io.smallrye.jwt.build.Jwt;
import at.favre.lib.crypto.bcrypt.BCrypt;
import java.time.Duration;
import jakarta.enterprise.context.ApplicationScoped;

import pfe.model.User;
import pfe.Provider.ITokenProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import jakarta.annotation.Priority;

@Priority(1)
@ApplicationScoped
public class JwtTokenProvider implements ITokenProvider {

    @ConfigProperty(name = "mp.jwt.verify.issuer")
    String jwtIssuer;

    @Override
    public String GenerateToken(String password, User user, String username) {

        BCrypt.Result result = BCrypt.verifyer().verify(password.toCharArray(), user.passwordHash);

        if (!result.verified) {
            return null;
        }

        return Jwt.issuer(jwtIssuer)
                .subject(username)
                .expiresIn(Duration.ofHours(4))
                .claim("userId", user.id) // Ajout d'attribut dans token (ID utilisateur)
                .sign();
    }
}