import React, { useEffect, useState } from 'react';
import EditModel from '../edit-model/EditModel';
import logo from '../../assets/avatar.svg'
import '../userFetch/useFetch.css'

const API_URL = "http://localhost:4000/users";

const UsersFetch = () => {
    const [editUser, setEditUser] = useState(null);
    const [data, setData] = useState(null);
    const [reload, setReload] = useState(true);
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(res => setData(res));
    }, [reload]);

    const handleCreateUsers = e => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let users = Object.fromEntries(formData.entries());

        fetch(API_URL,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(users)
        })
        .then(res => {
            setReload(prevReload => !prevReload);
        });
    };

    const handleDelete = id => {
        fetch(`${API_URL}/${id}`,{
            method: "DELETE"
        })
        .then(() => {
            setReload(prevReload => !prevReload);
        });
    };
    const handleEdit = id => {
    setEditingUserId(id);
    const userData = data.find(user => user.id === id);
    setEditUser(userData);
};


    return (
        <>
            <div className='fetch'>
                <form className='form' onSubmit={handleCreateUsers} action="">
                    <input className='input' type="text" name="name" placeholder='name...'/>
                    <input className='input' type="number" name="age" placeholder='age...'/>
                    <button className='buttons'>create</button>
                </form>
                <div className="nav-links">
                {data?.map(user => (
                    <div className='nav' key={user.id}>
                        <img className='img' src={logo} alt="" />
                        <p className='p'>{user.name}</p>
                        <p className='p'>{user.age}</p>
                        <button className='buttons' onClick={() => handleEdit(user.id)}>edit</button>
                        <button className='buttons' onClick={() => handleDelete(user.id)}>delete</button>
                    </div>
                ))}
                </div>
            </div>
            {editUser ? (
                <EditModel 
                data={editUser} 
                setData={setEditUser}
                onSave={updatedData => {
                    setData(prevData => prevData.map(user => user.id === updatedData.id ? updatedData : user));
                    setEditUser(null);
                }}
                onCancel={() => setEditUser(null)}/>
                ) : <></>}
        </>
    );
};

export default UsersFetch;
