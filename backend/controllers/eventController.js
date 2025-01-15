const Event = require('../models/Event');
const Participant = require('../models/Participant');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.createEvent = [
   
  async (req, res) => {
    const { nom, description, date, mode, lien } = req.body;
    let photo = '';
  
    if (req.file) {
      photo = `/uploads/${req.file.filename}`;
    }
  
    try {
      const event = await Event.create({ nom, description, date, mode, lien,photo, createdBy: req.user._id });
      res.status(201).json(event);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ msg: error.message });
    }
  }
];

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
    const { eventId } = req.params;
    const { userId } = req.body;  // S'assurer que userId est bien passé dans req.body
  
    // Vérification de l'événement et de l'utilisateur
    const event = await Event.findById(eventId);
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
    user.evenementsInscrits.push(eventId);  // Utiliser eventId et non pas id
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

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'nom').populate('participants', 'nom');

    res.status(200).json({ message: 'Liste des événements', events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};