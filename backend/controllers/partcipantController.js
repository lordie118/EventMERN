const Participant = require('../models/Participant');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { nom, email, motDePasse, mode } = req.body;

  if (!nom || !email || !motDePasse || !mode) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }
  try {
    
  
    // const hashedPassword = await bcrypt.hash(req.body.motDePasse, 10);
    const newParticipant = new Participant({
      nom: req.body.nom,
      email: req.body.email,
      motDePasse: req.body.motDePasse,
      mode: req.body.mode,
      role: req.body.role
    });

    await newParticipant.save();
    res.status(201).json({ message: 'Participant créé avec succès', participant: newParticipant });
  } catch (error) {
    console.error('Erreur serveur lors de l\'inscription:', error); // Afficher l'erreur exacte
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const participant = await Participant.findOne({ email });
    if (!participant) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    if (motDePasse !== participant.motDePasse) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ _id: participant._id, role: participant.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};


