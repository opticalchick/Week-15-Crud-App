import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


function UsersList() {
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [editUserId, setEditUserId] = useState(null);
    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName, setEditLastName] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get
                    ('https://65bbf6c152189914b5bd6a9e.mockapi.io/users');

                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching the list of users:", error.message);
            }
        };

        fetchUsers();
    }, []);

    const handleCreateUser = async () => {
        try {
            if (!firstName || !lastName || !phone) {
                console.error("All fields are required!");
                return;
            }

            const newUser = {
                lastName: (lastName),
                firstName: (firstName),
                phone: (phone)
            };

            console.log('New User:', newUser);

            await axios.post('https://65bbf6c152189914b5bd6a9e.mockapi.io/users',
                newUser
            );

            const response = await axios.get('https://65bbf6c152189914b5bd6a9e.mockapi.io/users');

            setUsers(response.data);

            setLastName('');
            setFirstName('');
            setPhone('');
        } catch (error) {
            console.error('Error creating User:', error.message);

            if (error.response) {
                console.log('Database Response (Error):', error.response.data);
            }
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`https://65bbf6c152189914b5bd6a9e.mockapi.io/users/${id}`);

            const response = await axios.get('https://65bbf6c152189914b5bd6a9e.mockapi.io/users');

            setUsers(response.data);
        } catch (error) {
            console.error("Error deleting user record:", error.message);
            if (error.response) {
                console.log('Database response (Error):', error.response.data);
            }
        }
    };
    const handleEditUser = (user) => {
        setEditUserId(user.id);
        setEditLastName(user.lastName);
        setEditFirstName(user.firstName);
        setEditPhone(user.phone);

        setShowEditForm(true);
    };

    const handleUpdateUser = async () => {
        try {
            if (
                !editLastName || !editFirstName || !editPhone
            ) {
                console.error('All fields are required!');
                return;
            }

            const updatedUser = {
                lastName: (editLastName),
                firstName: (editFirstName),
                phone: (editPhone)
            };

            await axios.put(`https://65bbf6c152189914b5bd6a9e.mockapi.io/users/${editUserId}`,
                updatedUser
            );

            const response = await axios.get('https://65bbf6c152189914b5bd6a9e.mockapi.io/users');

            setUsers(response.data);

            setShowEditForm(false);

            setEditLastName('');
            setEditFirstName('');
            setEditPhone('');
        } catch (error) {
            console.error('Error updating user information:', error.message);

            if (error.response) {
                console.log('Database response (Error):', error.response.data);
            }
        }
    };


    return (
        <div className='UsersListContainer'>
            <h2 className='PhoneList'>Phone List</h2>
            {showEditForm && (
                <div className='editFormContainer'>
                    <h3>Edit User</h3>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type='text'
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)} />
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type='text'
                            value={editFirstName}
                            onChange={(e) => setEditFirstName(e.target.value)} />
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type='tel'
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)} />
                        <button className='editButton' type='button'
                            onClick={handleUpdateUser}>Update User</button>
                    </Form.Group>
                </div>
            )}
            <div>
                <Form.Group>
                    <div className='form-group mb-2'>
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='form-group mx-sm-3 mb-2'>
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className='col'>
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control
                            type='tel'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                    </div><br></br>
                    <button type='button' className='btn btn-primary' onClick={handleCreateUser}>Create New User</button>

                </Form.Group>

                <h2>Phone number List</h2>
                <table className='userTable'>
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Phone Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.lastName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => handleEditUser(user)}>
                                        Edit</button>
                                    <button className='btn btn-danger' onClick={() =>
                                        handleDeleteUser(user.id)}>Delete</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div >
    );
};


export default UsersList;

























