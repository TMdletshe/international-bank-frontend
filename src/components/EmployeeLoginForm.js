import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
} from '@mui/material';

const EmployeeLoginForm = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        try {
            const response = await axios.post('https://localhost:5001/api/employeeauth/login', {
                employeeId,
                password,
            });

            const { token } = response.data;
            localStorage.setItem('employeeToken', token);
            setSuccessMsg('Login successful!');
            navigate("/EmployeeDashboard");// Redirect to employee dashboard or fetch payments
        } catch (error) {
            setErrorMsg('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Employee Login
                </Typography>

                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                {successMsg && <Alert severity="success">{successMsg}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Usename"
                        variant="outlined"
                        margin="normal"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EmployeeLoginForm;
