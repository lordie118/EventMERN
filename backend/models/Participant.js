const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const participantSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  mode: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['organisateur', 'participant'], 
    default: 'participant',
    required: true 
  },
  evenementsInscrits: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Event' 
    }
  ] // Liste des événements auxquels l'utilisateur est inscrit
});
participantSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);  // Hash du mot de passe avant la sauvegarde
  }
  next();
});

participantSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);  // Comparer le mot de passe fourni avec le hash
};

module.exports = mongoose.model('Participant', participantSchema);
