import React, { useState } from "react";
import { login } from "../services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div>
            <h1 style={{ color: '#3A2119', textAlign: 'center' ,padding: '20px', margin: '20px'}}>Connexion:</h1>
            <form onSubmit={handleSubmit}>
                <label>Email :</label><br />
  <input
    type="email"
    placeholder="AnbarAlaoui@example.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    style={{ width: "90%" }}
/>
<br /><br />
   <label>Mot de passe:</label><br />

<input
    type="password"
    placeholder="12345EEExample"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    style={{ width: "90%" }}
/>
                <br /> 
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;