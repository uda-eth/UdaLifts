import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);

  // Auth middleware
  app.use('/api', (req, res, next) => {
    const userId = req.header('X-Replit-User-Id');
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    next();
  });

  // Protected routes
  app.get('/api/user', (req, res) => {
    const user = {
      id: req.header('X-Replit-User-Id'),
      name: req.header('X-Replit-User-Name'),
      image: req.header('X-Replit-User-Profile-Image')
    };
    res.json(user);
  });

  return httpServer;
}
