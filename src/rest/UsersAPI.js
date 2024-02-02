const USERS_URL = 'https://65bbf6c152189914b5bd6a9e.mockapi.io/users';

class UsersAPI {
    get = async () => {
        try {
            const resp = await fetch(USERS_URL);
            const data = await resp.json();
            return data;
        } catch (e) {
            console.log('It looks like there was an issue fetching the list.', e);
        }
    }

    put = async (user) => {
        try {
            const resp = await fetch(`${USERS_URL}/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            return await resp.json();
        } catch (e) {
            console.log('It looks like there was an issue updating the list.', e);
        }
    }
}

export const UsersAPI = new UsersAPI();