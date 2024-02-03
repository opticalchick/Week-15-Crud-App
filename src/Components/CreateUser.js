import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const navigate = useNavigate();
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                'https://65bbf6c152189914b5bd6a9e.mockapi.io/users'
            );
            setUsers(response.data);
        } catch (error) {
            console.error('Error getting users:', error.message);
        }
    };

    const handleCreateUser = async () => {
        try {
            if (!lastName || !firstName || !phone) {
                console.error('All fields are required!');
                return;
            }

            const newUser = {
                lastName,
                firstName,
                phone,
            };

            console.log('New User:', newUser);

            await axios.post('https://65bbf6c152189914b5bd6a9e.mockapi.io/users', newUser);

            fetchUsers();

            setLastName('');
            setFirstName('');
            setPhone('');

            navigate("/");
        } catch (error) {
            console.error('Error creating new user:', error.message);

            if (error.response) {
                console.log('Database Response (Error):', error.response.data);
            }
        }
    };

    return (
        <div>
            <h2>Create New User</h2>
            <form>
                <label>Last Name:</label>
                <input
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
                <label>First Name:</label>
                <input
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
                <label>Phone Number</label>
                <input
                    type='tel'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} />
                <button type='button' onClick={handleCreateUser}>Create User</button>
            </form>

            <h2>Phone Number List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Lane Name</th>
                        <th>First Name</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.lastName}</td>
                            <td>{user.firstName}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CreateUser;