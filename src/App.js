import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PaymentForm from './components/PaymentForm';
import EmployeeLoginForm from './components/EmployeeLoginForm';
import EmployeeDashboard from './components/EmployeeDashboard';
import Navbar from './components/Navbar'; 




function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        International Bank
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Login</Button>
                    <Button color="inherit" component={Link} to="/register">Sign Up</Button>
                    <Button color="inherit" component={Link} to="/payment">Payment</Button>

                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>

                <Navbar>   
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/employee-login">Employee Login</Link></li>
                    {/* Add more links here */}
                </ul>
                </Navbar>
                <Routes>
                
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/employee-login" element={<EmployeeLoginForm />} />
                    <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                    <Route path="/payment" element={<PaymentForm />} />

                </Routes>
            </Container>
        </Router>
    );
}

export default App;
