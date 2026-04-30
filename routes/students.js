const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.render('index', { students });
});

router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/view/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('view', { student });
});

router.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('edit', { student });
});

router.put('/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

router.delete('/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;