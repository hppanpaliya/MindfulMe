import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../../utils/firebase';


const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Join</h2>
      <form onSubmit={handleJoin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default Join;
