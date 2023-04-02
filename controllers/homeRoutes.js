const router = require('express').Router();
const { Project, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('homepage', { projects, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
