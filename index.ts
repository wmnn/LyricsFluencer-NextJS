//@ts-nocheck
import express from 'express';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import apiRoutes from './routes/api.js';
import paymentRoutes from './routes/payment.js';
import cookieParser from 'cookie-parser';
// import fs from 'fs';

// const express = require("express");
const next = require("next");
// const cookieParser = require('cookie-parser');
// const apiRoutes = require("./routes/api.js");
// const paymentRoutes = require("./routes/payment.js");
// const cors = require ("cors");
// require('dotenv').config()

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cors({ origin: process.env.ROOT, credentials: true }))
    server.use(cookieParser());
    server.use(express.json());
    
    // give all request to Nextjs server
    server.get('/_next/*', (req, res) => {
        handle(req, res);
    });

    // server.use("/api", apiRoutes(server));
    // server.use("/payment", paymentRoutes(server));
  

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });