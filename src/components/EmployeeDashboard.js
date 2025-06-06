import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    Button, Paper, Typography
} from '@mui/material';

const EmployeeDashboard = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('token'); // Employee token
                const res = await axios.get('https://localhost:5001/api/employee/unverified-payments', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPayments(res.data);
            } catch (err) {
                console.error('Error fetching payments', err);
            }
        };

        fetchPayments();
    }, []);

    const handleVerify = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`https://localhost:5001/api/employee/verify-transaction/${id}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPayments(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Verification failed', err);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>Employee Payment Verification Dashboard</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Sender</TableCell>
                        <TableCell>Recipient</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>SWIFT Code</TableCell>
                        <TableCell>Verify</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map(p => (
                        <TableRow key={p.id}>
                            <TableCell>{p.senderName}</TableCell>
                            <TableCell>{p.recipientName}</TableCell>
                            <TableCell>{p.amount}</TableCell>
                            <TableCell>{p.swiftCode}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleVerify(p.id)}>
                                    Verify + Send to SWIFT
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default EmployeeDashboard;
