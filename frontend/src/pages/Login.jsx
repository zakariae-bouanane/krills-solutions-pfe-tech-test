import { useState } from "react";
import axios from "../interceptor/axios";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("/auth/login", {
                username,
                password,
            });

            localStorage.setItem("token", res.data.token);
            window.location.href = "/dashboard";
        } 
        catch (err) {
            console.log(err);
            setError("Invalid username or password");
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4"> 
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl">
                            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h2>

                    <form onSubmit={handleLogin}>

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />

                        <button 
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:bg-indigo-400"
                            >Login</button>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </form>
                    <p className="mt-4 text-xs text-center text-gray-500">
                        Default account: admin/admin
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
