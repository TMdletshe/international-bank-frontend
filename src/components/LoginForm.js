import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
   
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [accountNumber, setAccountNumber] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch("https://localhost:5001/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accountNumber, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful");
            navigate("/payment");
        } else {
            alert(data || "Login failed");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
                <Typography variant="h4" gutterBottom align="center">
                    International Bank - Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate>
                    <TextField
                        label="Account Number"
                        fullWidth
                        required
                        margin="normal"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                    <Box mt={2} textAlign="center">
                      
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginForm;
