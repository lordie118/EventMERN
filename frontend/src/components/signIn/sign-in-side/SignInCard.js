import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { signup } from '../../../redux/slices/userSlice';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function SignUpCard() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [mode, setMode] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateInputs = () => {
    const newErrors = {};
    if (!nom) newErrors.nom = 'Le nom est requis.';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Entrez une adresse email valide.';
    if (!motDePasse || motDePasse.length < 6)
      newErrors.motDePasse = 'Le mot de passe doit comporter au moins 6 caractères.';
    if (!mode) newErrors.mode = 'Le mode est requis.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const signupData = { nom, email, motDePasse, mode };
    try {
      await dispatch(signup(signupData)).unwrap();
      setNom('');
      setEmail('');
      setMotDePasse('');
      setMode('');
      setErrors({});
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Inscription
      </Typography>
      <Box
        component="form"
        onSubmit={handleSave}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="nom">Nom</FormLabel>
          <TextField
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            error={!!errors.nom}
            helperText={errors.nom}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="mode">Mode</FormLabel>
          <TextField
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            error={!!errors.mode}
            helperText={errors.mode}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="motDePasse">Mot de passe</FormLabel>
          <TextField
            id="motDePasse"
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            error={!!errors.motDePasse}
            helperText={errors.motDePasse}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          S'inscrire
        </Button>
      </Box>
      <Divider>ou</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Inscription avec Google')}
        >
          Inscription avec Google
        </Button>
      </Box>
    </Card>
  );
}
