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

module.exports = router;
