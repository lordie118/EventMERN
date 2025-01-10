const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  mode: { type: String, enum: ['enligne', 'présentiel'], required: true },
  lien: { type: String },
  photo: { type: String },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Participant', 
    required: true 
  }, // Organisateur de l'événement
  participants: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Participant' 
    }
  ] // Liste des utilisateurs participants
});

module.exports = mongoose.model('Event', eventSchema);
