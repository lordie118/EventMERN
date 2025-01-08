const Event = require('../models/Event');
const Participant = require('../models/Participant');

exports.createEvent = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'Utilisateur non authentifié' });
    }
    const newEvent = new Event({
      nom: req.body.nom,
      description: req.body.description,
      date: req.body.date,
      mode: req.body.mode,
      lien: req.body.lien,
      createdBy: req.user._id // L'utilisateur qui crée l'événement (organisateur)
    });

    await newEvent.save();
    res.status(201).json({ message: 'Événement créé avec succès', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé.' });
    }
    res.status(200).json({ message: 'Événement modifié avec succès', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé.' });
    }
    res.status(200).json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUserToEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Vérification de l'événement et de l'utilisateur
    const event = await Event.findById(id);
    const user = await Participant.findById(userId);
    if (!event || !user) {
      return res.status(404).json({ message: 'Événement ou utilisateur non trouvé.' });
    }

    // Vérifier si l'utilisateur est déjà inscrit à l'événement
    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: 'Utilisateur déjà inscrit à cet événement.' });
    }

    // Ajouter l'utilisateur à l'événement
    event.participants.push(userId);
    user.evenementsInscrits.push(id);
    await event.save();
    await user.save();

    res.status(200).json({ message: 'Inscription réussie', event, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserEvents = async (req, res) => {
  
  try {
    const user = await Participant.findById(req.user._id).populate('evenementsInscrits');
    console.log(user.evenementsInscrits);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json({ message: 'Événements de l\'utilisateur', events: user.evenementsInscrits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};