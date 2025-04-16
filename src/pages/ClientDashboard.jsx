import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, startOfWeek, endOfWeek } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Carousel from 'react-material-ui-carousel';
import { keyframes } from '@mui/system';

function ClientDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState('');
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const navigate = useNavigate();

  const services = [
    { value: 'manicure', label: 'Manicure', price: 'R$ 35,00' },
    { value: 'pedicure', label: 'Pedicure', price: 'R$ 40,00' },
    { value: 'manicure_pedicure', label: 'Manicure + Pedicure', price: 'R$ 70,00' },
    { value: 'spa', label: 'Spa dos Pés', price: 'R$ 80,00' },
  ];

  const carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
      title: 'Manicure Profissional',
      description: 'Cuide das suas unhas com nossa equipe especializada',
    },
    {
      image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53',
      title: 'Pedicure Relaxante',
      description: 'Momento de cuidado e relaxamento para seus pés',
    },
    {
      image: 'https://images.unsplash.com/photo-1610992015732-2449b0c26670',
      title: 'Designs Exclusivos',
      description: 'Arte e cuidado em cada detalhe',
    },
  ];

  // Gera os dias do calendário incluindo dias do mês anterior e próximo para completar as semanas
  const calendarDays = React.useMemo(() => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Começa no domingo
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 }); // Termina no sábado

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [selectedDate]);

  // Gera horários disponíveis
  function generateTimeSlots() {
    return [
      { time: '08:00', available: true },
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: true },
      { time: '12:00', available: true },
      { time: '13:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
      { time: '16:00', available: true },
      { time: '17:00', available: true },
      { time: '18:00', available: true },
      { time: '19:00', available: true },
      { time: '20:00', available: true },
    ];
  }

  const handlePreviousMonth = () => {
    setSelectedDate(addMonths(selectedDate, -1));
  };

  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowTimeSlots(true);
  };

  const handleCloseTimeSlots = () => {
    setShowTimeSlots(false);
  };

  const handleTimeSlotClick = (time) => {
    if (!selectedService) {
      alert('Por favor, selecione um serviço primeiro');
      return;
    }
    const formattedDate = format(selectedDate, 'dd/MM/yyyy');
    alert(`Agendamento para ${formattedDate} às ${time} - ${selectedService}`);
    setShowTimeSlots(false);
  };

  // Definindo a animação do carrossel
  const rotateAnimation = keyframes`
    0% {
      transform: perspective(1000px) rotateX(0deg);
    }
    100% {
      transform: perspective(1000px) rotateX(360deg);
    }
  `;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main' }}>
            Nail Design Studio
          </Typography>
        </Toolbar>
      </AppBar>

      <Container 
        maxWidth={false} 
        sx={{ 
          px: { xs: 2, md: 4 }, 
          mt: 4,
          maxWidth: '1600px',
          mx: 'auto'
        }}
      >
        <Grid container spacing={3}>
          {/* Conteúdo Principal - Lado direito */}
          <Grid item xs={12} md={9} lg={9.5}>
            {/* Carrossel e Serviços em linha */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* Carrossel */}
              <Grid item xs={12} md={8}>
                <Carousel
                  animation="slide"
                  interval={5000}
                  navButtonsAlwaysVisible
                  indicators={false}
                  sx={{ 
                    borderRadius: 2, 
                    overflow: 'hidden',
                    height: { xs: 300, md: 400 },
                  }}
                >
                  {carouselItems.map((item, index) => (
                    <Card key={index} sx={{ height: { xs: 300, md: 400 } }}>
                      <CardMedia
                        component="img"
                        height={400}
                        image={item.image}
                        alt={item.title}
                        sx={{ 
                          objectFit: 'cover',
                          height: { xs: 300, md: 400 },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: 'rgba(0, 0, 0, 0.7)',
                          p: 3,
                        }}
                      >
                        <Typography variant="h5" color="primary.main" gutterBottom>
                          {item.title}
                        </Typography>
                        <Typography variant="body1" color="white">
                          {item.description}
                        </Typography>
                      </Box>
                    </Card>
                  ))}
                </Carousel>
              </Grid>

              {/* Coluna de Serviços */}
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    height: { xs: 'auto', md: 400 },
                    bgcolor: '#1A1825',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      p: 1.5,
                      textAlign: 'center',
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                      }}
                    >
                      Escolha o Serviço
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flex: 1,
                    p: 2,
                    gap: 2,
                    justifyContent: 'space-around',
                  }}>
                    {services.map((service) => (
                      <Button
                        key={service.value}
                        fullWidth
                        variant={selectedService === service.value ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => setSelectedService(service.value)}
                        sx={{
                          py: 1.5,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 0.5,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: selectedService === service.value ? 'primary.main' : 'rgba(233, 30, 99, 0.2)',
                          bgcolor: selectedService === service.value ? 'primary.main' : 'transparent',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: selectedService === service.value ? 'primary.main' : 'rgba(233, 30, 99, 0.08)',
                          },
                        }}
                      >
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: 'white',
                          }}
                        >
                          {service.label}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{
                            color: selectedService === service.value ? 'white' : 'primary.main',
                            bgcolor: selectedService === service.value ? 
                              'rgba(255, 255, 255, 0.2)' : 
                              'rgba(233, 30, 99, 0.1)',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            fontWeight: 'medium',
                          }}
                        >
                          {service.price}
                        </Typography>
                      </Button>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Calendário */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                bgcolor: 'background.paper', 
                mb: 3,
                borderRadius: 2,
                background: '#1A1825',
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton onClick={handlePreviousMonth} sx={{ color: 'white' }}>
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton onClick={handleToday} sx={{ color: 'white' }}>
                    <TodayIcon />
                  </IconButton>
                  <IconButton onClick={handleNextMonth} sx={{ color: 'white' }}>
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
                </Typography>
              </Box>

              <Box sx={{ width: '100%' }}>
                <Grid 
                  container 
                  spacing={0.5} 
                  sx={{ 
                    '& .MuiGrid-item': {
                      width: 'calc(100% / 7)',
                      flexGrow: 0,
                      maxWidth: 'calc(100% / 7)',
                      flexBasis: 'calc(100% / 7)',
                    }
                  }}
                >
                  {/* Dias da Semana */}
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                    <Grid item key={day}>
                      <Button
                        fullWidth
                        disabled
                        sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.main',
                          borderRadius: 1,
                          py: 1,
                          '&.Mui-disabled': {
                            color: 'white',
                          },
                        }}
                      >
                        {day}
                      </Button>
                    </Grid>
                  ))}

                  {/* Dias do Mês */}
                  {calendarDays.map((date) => (
                    <Grid item key={date.toString()}>
                      <Button
                        fullWidth
                        onClick={() => handleDayClick(date)}
                        disabled={!isSameMonth(date, selectedDate)}
                        sx={{
                          minWidth: 0,
                          height: '40px',
                          p: 0,
                          color: !isSameMonth(date, selectedDate)
                            ? 'rgba(255, 255, 255, 0.3)'
                            : isSameDay(date, selectedDate)
                            ? 'white'
                            : 'rgba(255, 255, 255, 0.7)',
                          bgcolor: isSameDay(date, selectedDate) ? 'primary.main' : 'transparent',
                          border: '1px solid',
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: isSameDay(date, selectedDate) 
                              ? 'primary.dark' 
                              : 'rgba(255, 255, 255, 0.1)',
                          },
                          '&.Mui-disabled': {
                            color: 'rgba(255, 255, 255, 0.3)',
                            borderColor: 'rgba(255, 255, 255, 0.05)',
                          },
                        }}
                      >
                        {format(date, 'd')}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>

            {/* Seção de Cadastro */}
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h6" gutterBottom color="primary">
                Primeiro Agendamento?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Cadastre-se para receber novidades, promoções e facilitar seus próximos agendamentos
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                startIcon={<PersonAddIcon />}
                onClick={() => navigate('/register')}
              >
                Fazer Cadastro
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Modal de Horários */}
      <Dialog 
        open={showTimeSlots} 
        onClose={handleCloseTimeSlots}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1A1825',
            color: 'white',
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          pb: 2
        }}>
          <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
            {format(selectedDate, 'EEEE', { locale: ptBR })}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {format(selectedDate, 'dd/MM/yyyy')}
          </Typography>
          {selectedService && (
            <Typography variant="subtitle1" color="primary.main" sx={{ mt: 1 }}>
              {services.find(s => s.value === selectedService)?.label}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <Grid 
            container 
            spacing={2} 
            sx={{ 
              mt: 1,
              px: 1,
              py: 2,
            }}
          >
            {generateTimeSlots().map((slot) => (
              <Grid item xs={6} sm={4} key={slot.time}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  disabled={!slot.available}
                  onClick={() => handleTimeSlotClick(slot.time)}
                  sx={{
                    height: '48px',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'rgba(233, 30, 99, 0.3)',
                    color: 'white',
                    bgcolor: 'rgba(26, 24, 37, 0.8)',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      borderColor: 'primary.main',
                      color: 'white',
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.3)',
                    }
                  }}
                >
                  {slot.time}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          px: 3,
          py: 2,
        }}>
          <Button 
            onClick={handleCloseTimeSlots} 
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              px: 4,
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ClientDashboard; 