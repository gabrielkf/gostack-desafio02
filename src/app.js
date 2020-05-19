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

app.put('/repositories/:id', checkRepo, (req, res) => {
  const { title, url, techs } = req.body;

  const index = req.repoIndex;

  const editedRepo = {
    id: repositories[index].id,
    title: title || repositories[index].title,
    url: url || repositories[index].url,
    techs: techs || repositories[index].techs,
    likes: repositories[index].likes,
  };

  repositories[index] = editedRepo;

  return res.json(editedRepo);
});

app.delete('/repositories/:id', checkRepo, (req, res) => {
  const { repoIndex } = req;
  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});

app.post(
  '/repositories/:id/like',
  checkRepo,
  (req, res) => {
    const repository = repositories[req.repoIndex];

    repository.likes += 1;

    repositories[req.repoIndex] = repository;

    return res.json(repository);
  }
);

module.exports = app;
