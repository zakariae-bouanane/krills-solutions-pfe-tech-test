import Header from "./Header";
import handleLogout from "../services/handleLogout";
import AddFriendForm from "../components/AddFriendForm";
import {useCallback, useEffect, useState} from 'react'
import { getFriends, addFriend } from "../services/friendService";


function Dashboard() {
    
    const [friends, setFriends] = useState([]);
    const [listError, setListError] = useState(null);

    const fetchFriends = useCallback(async () => {
        setListError(null);
        try {
            const data = await getFriends();
            setFriends(data);
        } catch (error) {
            setListError(error.message);
        }
    }, []);

    const handleFriendAdded = () => {
        fetchFriends();
    };

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    
    // --- Dashboard Layout ---
    return (
            <div className="space-y-8">
                <Header logout={handleLogout}/>
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight text-center">
                    Your Friend Network
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* COLUMN 1: FRIEND ADDITION FORM */}
                    <div className="md:col-span-1">
                        <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
                            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
                                Add a New Friend
                            </h2>
                            
                            {/* THE ADD COMPONENT */}
                            <AddFriendForm 
                                addFriend={addFriend} 
                                onFriendAdded={handleFriendAdded} 
                            />
                        </div>
                    </div>

                    {/* COLUMN 2: BIRTHDAY LIST */}
                    <div className="md:col-span-2">
                        <div className="p-6 bg-white rounded-xl shadow-2xl border border-indigo-100">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex justify-between items-center">
                                Upcoming Birthdays
                                <span className="text-sm font-medium text-indigo-600">
                                    Total: {friends.length}
                                </span>
                            </h2>
                            
                            {listError && <p className="text-red-500 text-center">{listError}</p>}

                            {friends.length === 0 ? (
                                <div className="text-center p-8 text-gray-500">No friends recorded yet. Add one!</div>
                            ) : (
                                <div className="space-y-4">
                                    {friends.map(friend => (
                                        <div key={friend.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-150">
                                            <p className="font-medium text-gray-900">
                                                {friend.firstName} {friend.name} 
                                                <span className="text-xs text-gray-500 ml-2">({friend.dateOfBirth})</span>
                                            </p>
                                            <p className="text-indigo-600 font-semibold">
                                                {/* Ensure your backend calculates and returns this date for the next birthday */}
                                                {friend.nextBirthday} 
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Dashboard;