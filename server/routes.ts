import type { Express } from "express";
import { createServer, type Server } from "http";
import stripeRouter from "./routes/stripe";

export function registerRoutes(app: Express): Server {
  // Register Stripe routes
  app.use('/api/stripe', stripeRouter);

  // Analytics endpoint
  app.post('/api/analytics', (req, res) => {
    const event = req.body;
    console.log('Analytics Event:', event);
    res.status(200).json({ message: 'Event logged successfully' });
  });

  const httpServer = createServer(app);
  return httpServer;
}