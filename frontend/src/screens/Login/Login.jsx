import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../logic/redux/actions/authActions";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();  
    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }, navigation));

    };

    return (
    <div className="flex justify-center items-center bg-gray-100 w-80">
        <form
            className={`flex flex-col w-full m-auto bg-white p-8 shadow-md rounded`}
            onSubmit={handleSubmit}
        >
        <div>
        <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex flex-col w-full m-auto"
        />
        <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="flex flex-col w-full m-auto"
        />
        </div>
        <Button 
        variant="contained" color="primary" type="submit">
            Login
        </Button>
        <Button 
        variant="outlined"   href="/register">
            Register
        </Button>
        </form>
    </div>
    );
}

export default Login;
