import express from 'express';

const useAppMiddlewares = (app: express.Application) => {
  app.use(express.json());
  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: true }));
}

export { useAppMiddlewares }