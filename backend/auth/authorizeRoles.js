export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.',
        required: allowedRoles,
        current: req.user.role
      });
    }
    
    next();
  };
};

// Specific role authorizations
export const requireAdmin = authorizeRoles('admin');
export const requireDirector = authorizeRoles('admin', 'director');
export const requireTeacher = authorizeRoles('admin', 'director', 'teacher');
export const requirePreceptor = authorizeRoles('admin', 'director', 'teacher', 'preceptor'); 