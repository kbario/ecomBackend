const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const CategoriesData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product}],
    });
    res.status(200).json(CategoriesData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const CategoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{model: Product}]
    })
    res.status(200).json(CategoryData)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(createCategory)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } });
    res.status(200).json(updateCategory)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id}
    });
    res.status(200).json(deleteCategory)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
