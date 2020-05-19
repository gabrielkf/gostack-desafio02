const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const checkRepo = (req, res, next) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(
    repo => repo.id === id
  );

  if (repoIndex < 0) {
    return res
      .status(400)
      .json({ error: 'Repository not found' });
  }

  req.repoIndex = repoIndex;

  next();
};

app.get('/repositories', (req, res) => {
  return res.json(repositories);
});

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepo);

  return res.json(newRepo);
});

app.put('/repositories/:id', (req, res) => {
  // TODO
});

app.delete('/repositories/:id', (req, res) => {
  // TODO
});

app.post('/repositories/:id/like', (req, res) => {
  // TODO
});

module.exports = app;
