import type { Express } from "express";
import { createServer, type Server } from "http";
import paymentsRouter from "./routes/payments";
import webhooksRouter from "./routes/webhooks";

export function registerRoutes(app: Express): Server {
  // Register Stripe payment routes
  app.use(paymentsRouter);
  
  // Register Stripe webhook routes
  app.use(webhooksRouter);
  // Analytics endpoint
  app.post('/api/analytics', (req, res) => {
    const event = req.body;
    console.log('Analytics Event:', event);
    res.status(200).json({ message: 'Event logged successfully' });
  });

  const httpServer = createServer(app);
  return httpServer;
}