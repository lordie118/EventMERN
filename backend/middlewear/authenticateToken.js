const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Récupérer le token

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });  // Si aucun token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {  // Vérifier le token
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }

    // Ajouter l'utilisateur authentifié dans req.user
    req.user = user;
    next();  // Passer au middleware suivant
  });
};

module.exports = authenticateToken;
