import React, { useEffect, useState } from 'react';
import { Link, useLinkClickHandler } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import InputGroup from 'react-bootstrap/InputGroup';


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


    // Gets users information from API and returns it.  If there is an error thrown,
    // it will log to the console with the error.
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

    // Create new instance of a User, taking in all of the required fields
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
            // Sends data with post request to API, then sends another get request for updated list
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
    // This is sends a delete request to API, then another get to repopulate the list
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

    // When edit button is clicked, edit form shows, and pulls in current data
    const handleEditUser = (user) => {
        setEditUserId(user.id);
        setEditLastName(user.lastName);
        setEditFirstName(user.firstName);
        setEditPhone(user.phone);

        setShowEditForm(true);
    };

    // This handles the user edit, sends PUT request, then another GET 
    // for user list, then hides the form again.
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

    // Container for create/edit forms and user data rendered in a table.  The editFormContainer
    //only shows when the 'edit' button is clicked in the userTable
    return (
        <div className='UsersListContainer'>
            <h2 className='PhoneList'>Add New Entry</h2><br></br>
            {showEditForm && (
                <div className='editFormContainer'>
                    <Form>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>Last Name</InputGroup.Text>
                            <Form.Control
                                type='text'
                                value={editLastName}
                                onChange={(e) => setEditLastName(e.target.value)} />
                            <InputGroup.Text>First Name</InputGroup.Text>
                            <Form.Control
                                type='text'
                                value={editFirstName}
                                onChange={(e) => setEditFirstName(e.target.value)} />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>Phone Number</InputGroup.Text>
                            <Form.Control

                                type='tel'
                                value={editPhone}
                                onChange={(e) => setEditPhone(e.target.value)} />
                            <button className='btn btn-info editUser' type='button'
                                onClick={handleUpdateUser}>Update User</button>
                        </InputGroup>
                    </Form>
                </div>
            )}<br></br>
            <div className='CreateFormContainer'>
                <Form>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>Last Name:</InputGroup.Text>
                        <Form.Control
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />

                        <InputGroup.Text>First Name:</InputGroup.Text>
                        <Form.Control
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>Phone Number:</InputGroup.Text>
                        <Form.Control
                            type='tel'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                        <button type='button' className='btn btn-primary' onClick={handleCreateUser}>Create New User</button>
                    </InputGroup>
                </Form><br></br><br></br>
            </div>
            <h2 className='text-center'>Phone number List</h2>
            <div className='userTable'>
                <table className='table table-dark table-striped table-bordered table-hover table-sm'>
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
                                    <button className='editButton btn btn-info' onClick={() => handleEditUser(user)}>
                                        Edit</button>
                                    <button className='deleteButton btn btn-danger' onClick={() =>
                                        handleDeleteUser(user.id)}>Delete</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};


export default UsersList;

























