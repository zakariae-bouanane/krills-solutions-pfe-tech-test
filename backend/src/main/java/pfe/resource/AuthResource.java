package pfe.resource;

import pfe.DTO.UserDto;
import pfe.service.AuthService;

import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    AuthService authService;

    @POST
    @Path("/login")
    public Response login(UserDto req) {
        String token = authService.login(req.username, req.password);

        if (token == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(Map.of("error", "Invalid username or password"))
                    .build();
        }

        return Response.ok(Map.of("token", token))
                .build();
    }
}
