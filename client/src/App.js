import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { UserItem } from './components/UserItem';

function App() {
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({
    id: null,
    FirstName: '',
    MiddleName: '',
    LastName: '',
  })
  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    setUsers(await axios.get('http://localhost:8000/').then(res => {return res.data})) 
  }

  const handleChange = (v) => {
    setNewUser({ ...newUser, [v.target.name]: v.target.value });
  }
  const add = () => {
    axios.post('http://localhost:8000/add', {
      ...newUser
    })
  }

  
  return (
    <div className="app__wrapper">
      <h1>Users</h1>
      <div className="addUser__wrapper">
        <input placeholder='first name' name='FirstName' onChange={handleChange} />
        <input placeholder='middle name' name='MiddleName' onChange={handleChange} />
        <input placeholder='last name' name='LastName' onChange={handleChange} />
        <button onClick={add}>Add user</button>
      </div>
      {
        users.map(el => (
          <UserItem
            key={el.id}
            id={el.id}
            firstName={el.FirstName}
            middleName={el.MiddleName}
            lastName={el.LastName}
          />
        ))
      }
      
    </div>
  );
}

export default App;
