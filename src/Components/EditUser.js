import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Sends GET/Read request to API and returns user's details with their unique Id
    // consoles error with message if API call is unsuccessful

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    `https://65bbf6c152189914b5bd6a9e.mockapi.io/users/${id}`);

                setUser(response.data);
            } catch (error) {
                console.error('Error getting user details:', error.message);
            }
        };

        fetchUserDetails();
    }, [id]);

    //  Sends PUT/Update request with updated info to API.  Will log errors to console if
    // unsuccessful.

    const handleUpdateUser = async (updatedData) => {
        console.log('Checking for updated information', updatedData);
        try {
            const response = await axios.put(
                `https://65bbf6c152189914b5bd6a9e.mockapi.io/users/${id}`,
                updatedData
            );

            if (response.status === 200) {
                console.log("User information successfully updated");
                navigate("/");
            } else {
                console.error("Failed to update user information. Server responded with:",
                    response
                );
            }
        } catch (error) {
            console.error('Error updating user information:', error.message);
            console.error('Error stack trace:', error.stack);
        }
    };

    return (
        <div>
            <h2>Edit User Information {id}</h2>
            {user ? (
                <div>
                    <button onClick={handleUpdateUser}>Update</button>
                </div>
            ) : (
                <p>Loading user details...</p>
            )
            }
        </div >
    );
};

export default EditUser;
