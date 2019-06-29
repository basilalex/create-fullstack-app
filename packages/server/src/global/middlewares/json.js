import express from 'express';

export const json = ({ app }) => app.use(express.json());
