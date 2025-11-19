import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const AddFriendForm = ({ onFriendAdded, addFriend }) => {
    const [formData, setFormData] = useState({
        name: '',
        firstName: '',
        dateOfBirth: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError(null);
        setSuccessMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!formData.name || !formData.firstName || !formData.dateOfBirth) {
            setError('Please fill out all fields.');
            return;
        }

        //ensure valid YYYY-MM-DD format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(formData.dateOfBirth)) {
            setError('Invalid date format. Please use the date picker.');
            return;
        }

        setIsLoading(true);

        try {
            // send data to backend
            await addFriend(formData);

            setSuccessMessage('Friend added successfully!');
            setFormData({ name: '', firstName: '', dateOfBirth: '' });

            // notify parent so it refreshes the list
            if (onFriendAdded) onFriendAdded();

        } catch (err) {
            setError(`Failed to save friend: ${err.message || 'An unknown error occurred.'}`);
        } finally {
            setIsLoading(false);
            setTimeout(() => setSuccessMessage(null), 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Last Name (Nom)
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
            </div>

            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name (Prénom)
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
            </div>

            <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth (Date de naissance)
                </label>
                <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
            </div>

            {error && (
                <div className="p-3 text-sm font-medium text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="p-3 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
                    {successMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                                3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Adding...
                    </>
                ) : (
                    <>
                        Add Friend
                        <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </>
                )}
            </button>
        </form>
    );
};

export default AddFriendForm;
