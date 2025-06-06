import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

function PaymentForm() {
    const [formData, setFormData] = useState({
        currency: "",
        amount: "",
        provider: "",
        swiftCode: "",
        recipientAccount: "",
    });

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://localhost:5001/api/Payments/send", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Payment submitted successfully!");
        } catch (err) {
            alert("Payment submission failed.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4} p={4} boxShadow={3} bgcolor="white" borderRadius={2}>
                <Typography variant="h5" gutterBottom>
                    Send a Payment
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        type="number"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Provider"
                        name="provider"
                        value={formData.provider}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="SWIFT Code"
                        name="swiftCode"
                        value={formData.swiftCode}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Recipient Account"
                        name="recipientAccount"
                        value={formData.recipientAccount}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Send Payment
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default PaymentForm;
