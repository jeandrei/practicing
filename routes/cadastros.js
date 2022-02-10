const express = require('express');

const router = express.Router();

const cadastros = require('../controllers/cadastros');

const { exemploMiddleware, verifyPassword } = require('../middleware');

router.get('/', exemploMiddleware, cadastros.listCadastros);
router.get('/secret', verifyPassword, cadastros.listCadastros);

router.get('/new', cadastros.newCadastro);

router.post('/', cadastros.saveCadastro);


router.get('/delete', cadastros.deleteCadastro);

router.delete('/', cadastros.cadastroDeletado);

router.get('/:id', cadastros.detailCadastro);

router.get('/:id/edit', cadastros.editCadastro);

router.put('/:id', cadastros.updateCadastro);

router.delete('/:id', cadastros.deleteCadastro);





module.exports = router;