const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tag = await Tag.findAll({ include: [{model: Product }] });
    if(!tag) {
      res.status(400),json({ message: "no tags found"})
    }
    res.status(200).json({ tag });
  } catch(e) {
    res.status(500).json({ message: "server error"})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, { include: [{model: Product }] });
    if(!tag) {
      res.status(400),json({ message: "no tags found"})
    }
    res.status(200).json({ tag });
  } catch(e) {
    res.status(500).json({ message: "server error"})
  }
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    if(!tag) {
      res.status(400),json({ message: "Unable to create new tag"})
    }
    res.status(200).json({ tag });
  } catch(e) {
    res.status(500).json({ message: "server error"})
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(req.body, { where: { id: req.params.id } });
    if(!tag) {
      res.status(400),json({ message: "Unable to Update Tag"})
    }
    res.status(200).json({ tag });
  } catch(e) {
    res.status(500).json({ message: "server error"})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({ where: {id: req.params.id } });
    if(!tag) {
      res.status(400),json({ message: "Unable to DELETE Tag"})
    }
    res.status(200).json({ tag });
  } catch(e) {
    res.status(500).json({ message: "server error"})
  }
});

module.exports = router;
