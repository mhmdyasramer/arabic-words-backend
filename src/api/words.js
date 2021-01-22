const express = require('express');
const router = express.Router();
const monk = require('monk');
const joi = require('joi');

//const db = monk('mongodb://127.0.0.1:27017/words');

// connect to database
const db = monk(process.env.MONGO_URI);
const words = db.get('words');

const schema = joi.object({
  en: joi.string().trim().required(),
  ar: joi.string().trim().required(),
});

// GET all words
router.get('/', async (req, res, next) => {
  try {
    const items = await words.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
  // res.json({message: "All words exsist"});
});

// GET one word
router.get('/:id', async (req, res, next) => {
  // res.json({ message: 'Welcome to the API index' });
  try {
    const { id } = req.params;
    const foundWord = await words.findOne({ _id: id });

    if (!foundWord) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(foundWord);
  } catch (error) {
    next(error);
  }
});

// CREATE a word
router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const value = await schema.validateAsync(body);
    const inserted = await words.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// UPDATE a word
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const value = await schema.validateAsync(body);
    const updated = await
      words.findOneAndUpdate({ _id: id }, { $set: value });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE a word
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await
      words.findOneAndDelete({ _id: id });

    res.json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
