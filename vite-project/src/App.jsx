import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';

function App() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [village, setVillage] = useState('');
  const [alldata, setAlldata] = useState([]);
  const [selectedid, setSelectedid] = useState('');

  const list_of_users = [...alldata].reverse();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:2021/allusers');
      setAlldata(response.data);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2021/create', {
        u_name: username,
        age: age,
        village: village,
      });
      console.log(response.data);
      fetchData();
      setUsername('');
      setAge('');
      setVillage('');
    } catch (err) {
      console.log('Error submitting data:', err);
    }
  }

  function edit(id) {
    const item = alldata.find((e) => e.id === id);
    if (item) {
      setSelectedid(item.id);
      setAge(item.age);
      setUsername(item.u_name);
      setVillage(item.village);
    }
  }

  async function update(e) {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:2021/update/${selectedid}`, {
        u_name: username,
        age: age,
        village: village,
      });
      console.log(response.data);
      fetchData();
      setSelectedid('');
      setUsername('');
      setAge('');
      setVillage('');
    } catch (err) {
      console.log('Error updating data:', err);
    }
  }

  async function delete_item(delete_id) {
    try {
      const response = await axios.delete(`http://localhost:2021/delete/${delete_id}`);
      console.log(response.data);
      alert("user deleted successfully ")
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="overall_container">
      <h1>User Information</h1>

      {selectedid ? (
        <div className='edit_user_from_conatiner'>
          <h2>Edit User</h2>
          <form  className= "form_container" onSubmit={update}>
            <label  className="label_container">
              Username:
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label  className="label_container">
              Age:
              <input type="number" required  value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <label  className="label_container">
              Village:
              <input type="text" value={village} required onChange={(e) => setVillage(e.target.value)} />
            </label>
            <button  className="add_user_button" type="submit">Update User</button>
          </form>
        </div>
      ) : (
        <div className="form_submit_container">
          <h2>Add New User</h2>
          <form  className= "form_container" onSubmit={handleSubmit}>
            <label className="label_container">
              Username:
              <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className="label_container">
              Age:
              <input type="number" value={age}required  onChange={(e) => setAge(e.target.value)} />
            </label>
            <label className="label_container">
              Village:
              <input type="text" value={village}  required onChange={(e) => setVillage(e.target.value)} />
            </label>
            <button   className="add_user_button" type="submit">Submit</button>
          </form>
        </div>
      )}

      <div className='user_list_overall_container'>
    
          
          {list_of_users.length > 0 ? (
            list_of_users.map((user) => (
               
              <div key={user.id} className="users_list_container">
                <p>Username: {user.u_name}</p>
                <p>Age: {user.age}</p>
                <p>Village: {user.village}</p>
                <button className="users_list_container_edit_button" onClick={() => edit(user.id)}>
                  Edit
                </button>
                <button className="users_list_container_button" onClick={() => delete_item(user.id)}>
                  {' '}
                  delete
                </button>
      </div>

              
            ))
          ) : (
            <p>No users found</p>
          )}
      </div>
    </div>
  );
}

export default App;
