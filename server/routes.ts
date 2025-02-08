
import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express): Server {
  // Analytics endpoint
  app.post('/api/analytics', (req, res) => {
    const event = req.body;
    console.log('Analytics Event:', event);
    res.status(200).json({ message: 'Event logged successfully' });
  });

  const httpServer = createServer(app);
  return httpServer;
}
