import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/auth/profile")
        .then(result => {
            setUser(result.data.user);
        })
        .catch(err => console.log(err))
    }, []);

    return (
        <div className="mx-5 mt-5 flex justify-center">
            <div className="mt-3">
                {user ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee id</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
