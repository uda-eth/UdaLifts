import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";

export function registerRoutes(app: Express): Server {
  // sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Analytics endpoint
  app.post('/api/analytics', (req, res) => {
    const event = req.body;

    // Log the event (this could be extended to store in database)
    console.log('Analytics Event:', event);

    res.status(200).json({ message: 'Event logged successfully' });
  });

  const httpServer = createServer(app);

  return httpServer;
}