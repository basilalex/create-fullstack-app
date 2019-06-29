import express from 'express';
import path from 'path';

export const serveStatic = ({ app }) => {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), '../client/build')));
  }
};
