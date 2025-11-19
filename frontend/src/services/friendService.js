import axios from "../interceptor/axios";
import calculateNextBirthday from "./calculateNextBirthday";

export const getFriends = async () => {
    
    try {
        const response = await axios.get("api/friends/birthdays");

        return response.data.map(friend => ({            
            ...friend,
            nextBirthday: calculateNextBirthday(friend.dateOfBirth).display,
            nextBirthdaySortKey: calculateNextBirthday(friend.dateOfBirth).sortKey
        }));

    } catch (err) {
        throw new Error(
            'Could not load your friend list. Please check your network or login status.'
        );
    }
};

export const addFriend = async (friendData) => {
    
    try {
        const response = await axios.post("api/friends", friendData);
        return response.data;
    
    } catch (error) {
        
        const errorMessage =
            error.response?.data?.message ||
            'Network or Server Error during friend creation.';
        
        throw new Error(errorMessage);
    }
};
