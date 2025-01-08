const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'organisateur') {
      return res.status(403).json({ message: 'Accès interdit. Rôle insuffisant.' });
    }
    next();
  };
  
  module.exports = checkAdmin;
  