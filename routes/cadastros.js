const express = require('express');

const router = express.Router();

const cadastros = require('../controllers/cadastros');

router.get('/', cadastros.listCadastros);

router.get('/new', cadastros.newCadastro);

router.post('/', cadastros.saveCadastro);


router.get('/delete', cadastros.deleteCadastro);

router.delete('/', cadastros.cadastroDeletado);

router.get('/:id', cadastros.detailCadastro);

router.get('/:id/edit', cadastros.editCadastro);

router.put('/:id', cadastros.updateCadastro);



module.exports = router;