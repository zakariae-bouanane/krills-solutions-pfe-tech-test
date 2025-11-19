package pfe.Provider;

import pfe.model.User;

public interface ITokenProvider {

    String GenerateToken(String password, User user, String username);
}