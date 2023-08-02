const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll({ include: [{model: Product}] });
    if(!category) {
      res.status(400),json({ message: "no categories found"})
    }
    res.status(200).json({ category });
  } catch(e) {
    res.status(500).json({ message: "server error"})
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: [{model: Product}] });
    if(!category) {
      res.status(400),json({ message: "no categories found"})
    }
    res.status(200).json({ category });
  } catch(e) {
    res.status(500).json({ message: "server error"})
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if(!category) {
      res.status(400),json({ message: "Category cannot be created"})
    }
    res.status(200).json({ category });
  } catch(e) {
    res.status(500).json({ message: "server error"})
  }
});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, { where: { id: req.params.id } });
    if(!category) {
      res.status(400),json({ message: "Failed to update"})
    }
    res.status(200).json({ category });
  } catch(e) {
    res.status(500).json({ message: "server error"})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({ where: { id: req.params.id} });
    if(!category) {
      res.status(400),json({ message: "Failed to Delte"})
    }
    res.status(200).json({ category });
  } catch(e) {
    res.status(500).json({ message: "server error"})
  }
});

module.exports = router;
