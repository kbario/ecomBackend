const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const TagsData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product}],
    });
    res.status(200).json(TagsData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const TagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{model: Product}]
    })
    res.status(200).json(TagData)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
  const createTag = await Tag.create(req.body);
  res.status(200).json(createTag)
} catch (error) {
  res.status(500).json(error)
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body,
      { where: { id: req.params.id } });
    res.status(200).json(updateTag)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id}
    });
    res.status(200).json(deleteTag)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
