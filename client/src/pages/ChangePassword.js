import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { axiosClient } from '../utils/axiosClient';
import LoadingBar from 'react-top-loading-bar'; // Import loading bar for consistency

function ChangePassword() {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const ref = useRef(null); // Ref for the loading bar

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // Validate new password confirmation
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        try {
            ref.current.staticStart(); // Start loading bar

            // Get token from cookies
            const token = Cookies.get('Token');
            if (!token) {
                toast.error('You must be logged in to change your password.');
                return;
            }

            // Call API to change the password
            const response = await axiosClient.put(
                '/auth/change-password',
                {
                    email,
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Display success message and navigate to home page
            toast.success(response.data.message);
            ref.current.complete();
            navigate('/');
        } catch (error) {
            ref.current.complete();
            toast.error(error.response?.data?.message || 'Failed to change password');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-800">
            <LoadingBar color="orange" ref={ref} />
            <div className="bg-gray-900 w-full max-w-md p-6 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
                    Change Password
                </h2>
                <form onSubmit={handleChangePassword} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full border-gray-600 bg-gray-700 text-white rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-white mb-1"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="block w-full border-gray-600 bg-gray-700 text-white rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            placeholder="Enter current password"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-white mb-1"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="block w-full border-gray-600 bg-gray-700 text-white rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-white mb-1"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="block w-full border-gray-600 bg-gray-700 text-white rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            placeholder="Confirm new password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-700 text-white py-2 rounded-lg shadow-md hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 transition"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
