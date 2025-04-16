import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function ManicuristDashboard() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: 'Maria Silva',
      date: '2024-04-15',
      time: '14:00',
      service: 'Manicure + Pedicure',
      status: 'pending',
    },
    {
      id: 2,
      clientName: 'Ana Santos',
      date: '2024-04-15',
      time: '15:00',
      service: 'Manicure',
      status: 'pending',
    },
  ]);

  const handleConfirm = (id) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id
        ? { ...appointment, status: 'confirmed' }
        : appointment
    ));
  };

  const handleCancel = (id) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id
        ? { ...appointment, status: 'cancelled' }
        : appointment
    ));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Agendamentos
          </Typography>

          <Grid container spacing={3}>
            {appointments.map((appointment) => (
              <Grid item xs={12} key={appointment.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {appointment.clientName}
                    </Typography>
                    <Typography color="text.secondary">
                      Data: {appointment.date}
                    </Typography>
                    <Typography color="text.secondary">
                      Horário: {appointment.time}
                    </Typography>
                    <Typography color="text.secondary">
                      Serviço: {appointment.service}
                    </Typography>
                    <Typography 
                      color={
                        appointment.status === 'confirmed' ? 'success.main' :
                        appointment.status === 'cancelled' ? 'error.main' :
                        'text.secondary'
                      }
                    >
                      Status: {
                        appointment.status === 'pending' ? 'Pendente' :
                        appointment.status === 'confirmed' ? 'Confirmado' :
                        'Cancelado'
                      }
                    </Typography>
                  </CardContent>
                  {appointment.status === 'pending' && (
                    <CardActions>
                      <Button
                        startIcon={<CheckCircleIcon />}
                        variant="contained"
                        color="success"
                        onClick={() => handleConfirm(appointment.id)}
                      >
                        Confirmar
                      </Button>
                      <Button
                        startIcon={<CancelIcon />}
                        variant="contained"
                        color="error"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancelar
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default ManicuristDashboard; 