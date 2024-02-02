import React { useEffect, useState } from 'react';
import { User } from './User';
import { UsersAPI } from '../rest/UsersAPI.js';


export class UsersList extends React.Component {
    state = {
        users =[]
    };

    componentDidMount() {
        this.fetchUsers();
    };

    fetchUsers = async () => {
        const users = await UsersAPI.get();
        this.setState({ users });
    };

    updateUser = async (updatedUser) => {
        await UsersAPI.put(updatedUser);
        this.fetchUsers();
    };
    render() {
        return (
            <div className='user-list'>
                {this.state.users.map((user) => (
                    <User
                        user={user}
                        key={user.id}
                        updateUser={this.updateUser}
                    />
                ))}
            </div>
        )
    }
}  