import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";

const Login = () => {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            if (isRegister) {
                await register({ username, email, password, role });
                setMessage("Compte créé avec succès.");
            } else {
                await login(email, password);
                setMessage("Connexion réussie.");
            }

            navigate("/courses");
        } catch (err) {
            setError(err?.response?.data?.error || "Échec de l'authentification.");
        }
    };

    return (
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">{isRegister ? "Créer un compte" : "Connexion"}</h1>
                <button
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setIsRegister((prev) => !prev)}
                    type="button"
                >
                    {isRegister ? "J'ai déjà un compte" : "Créer un compte"}
                </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {isRegister && (
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Nom utilisateur</label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
                            type="text"
                            placeholder="adil123"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Mot de passe</label>
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {isRegister && (
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Rôle</label>
                        <select
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="student">Student</option>
                        </select>
                    </div>
                )}

                <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500" type="submit">
                    {isRegister ? "Créer le compte" : "Se connecter"}
                </button>
            </form>

            {message && <p className="mt-4 text-sm text-emerald-600">{message}</p>}
            {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}
        </div>
    );
};

export default Login;