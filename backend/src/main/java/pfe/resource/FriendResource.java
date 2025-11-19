package pfe.resource;

import pfe.DTO.FriendDTO;
import pfe.model.Friend;
import io.quarkus.security.Authenticated;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.stream.Collectors;

@Path("/api/friends")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class FriendResource {

    @Inject
    SecurityIdentity securityIdentity;

    /**
     * this returns current connected User from JWT token
     */
    private String getUserId() {

        return securityIdentity.getPrincipal().getName();
    }

    // --- CREATE (POST) ---
    @POST
    @Transactional
    public Response create(FriendDTO friendDTO) {
        Friend friend = new Friend();
        friend.userId = getUserId(); // Enforce data isolation
        friend.name = friendDTO.name;
        friend.firstName = friendDTO.firstName;
        friend.dateOfBirth = friendDTO.dateOfBirth;

        friend.persist();
        return Response.status(Response.Status.CREATED).entity(friend.id).build();
    }

    // --- READ (GET) - Upcoming Birthdays (Exigence fonctionnelle) ---
    @GET
    @Path("/birthdays")
    public List<FriendDTO> listUpcomingBirthdays() {
        String userId = getUserId();

        // Uses the Panache static method with business logic
        List<Friend> sortedFriends = Friend.findUpcomingBirthdays(userId);

        // Map to DTO for safe transfer
        return sortedFriends.stream().map(f -> {
            FriendDTO dto = new FriendDTO(f.name, f.firstName, f.dateOfBirth);
            dto.id = f.id;
            return dto;
        }).collect(Collectors.toList());
    }

    // --- READ (GET) - All Friends (simple list) ---
    @GET
    public List<FriendDTO> listAll() {
        String userId = getUserId();

        // Only list friends matching the current user's ID
        List<Friend> friends = Friend.list("userId", userId);

        return friends.stream().map(f -> {
            FriendDTO dto = new FriendDTO(f.name, f.firstName, f.dateOfBirth);
            dto.id = f.id;
            return dto;
        }).collect(Collectors.toList());
    }

    // --- DELETE ---
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        String userId = getUserId();

        // Find the friend and ensure it belongs to the current user before deleting
        Friend friend = Friend.findById(id);

        if (friend == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        if (!friend.userId.equals(userId)) {
            // Security: User is trying to delete another user's friend
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        friend.delete();
        return Response.noContent().build();
    }
}