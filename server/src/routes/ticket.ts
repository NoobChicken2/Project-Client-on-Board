import express from 'express'
const {fetchTableData} = require("../databaseConnection/fetchData");

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    return fetchTableData();
});

router.post('/', async (req, res) => {

});

router.patch('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

module.exports = router;