const { skills, messages } = require('../models/data');

exports.getHome = (req, res) => {
  res.render('home', { featuredSkills: skills.slice(0, 4) });
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.getDashboard = (req, res) => {
  res.render('dashboard', { skills });
};

exports.getSkillDetails = (req, res) => {
  const skill = skills.find(item => item.id === Number(req.params.id));
  if (!skill) {
    return res.status(404).send('Skill not found');
  }
  res.render('skill-details', { skill, relatedSkills: skills.filter(item => item.id !== skill.id).slice(0, 3) });
};

exports.getMessages = (req, res) => {
  res.render('messages', { messages, skills });
};

exports.getPostSkill = (req, res) => {
  res.render('post-skill');
};

exports.handlePostSkill = (req, res) => {
  res.redirect('/dashboard');
};
