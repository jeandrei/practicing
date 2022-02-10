const Cadastro = require('../models/cadastro');

module.exports.newCadastro = (req, res) => {
    res.render('cadastros/new');
};

module.exports.saveCadastro = async (req, res) => {   
    //Cadastro(req.body.cadastro)vai trazer todos os valores mas aqui é só exemplo não tem validação
    //Essa linha é muito importante para funcionar quando colocamos os nomes dos campos como cadastro[cadastroNome];
    //pq para trazer apenas o cadastroNome que precisamos para validar no model precisamos colocar da seguinte forma
    //req.body.cadastro
    const newCadastro = new Cadastro(req.body.cadastro);
    await newCadastro.save();
    res.redirect('cadastros/');
    console.log(`Novo cadastro gravado com sucesso: ${newCadastro}`);
};


module.exports.deleteCadastro = (req, res) => {
    res.render('cadastros/delete');
};

module.exports.cadastroDeletado = (req, res) => {
    res.send('Você clicou em delete');
};


module.exports.listCadastros = async (req, res) => {    
    const cadastros = await Cadastro.find({});     
    res.render('cadastros/index', { cadastros });
};

module.exports.detailCadastro = async (req, res) => {
    //pegamos o id do registro    
    const { id } = req.params;
    //fazemos a busca n banco de dados e passamos os valores para constante cadastro
    const cadastro = await Cadastro.findById(id);
    //se quiser verificar se está buscando o registro
    //localize um id no mongo db.cadastros.find({})
    //copie o id e cole no navegador http://ip:porta/cadastros/61a624a5cb409f3efbf8a4b2
    //e de um console.log(cadastro);
    //console.log(cadastro);
    res.render('cadastros/details', { cadastro });
}

module.exports.editCadastro = async (req, res) => {
    const { id } = req.params;
    const cadastro = await Cadastro.findById(id);
    res.render('cadastros/edit', { cadastro });
};

module.exports.updateCadastro = async (req, res) => {
    const { id } = req.params;
    const cadastro = await Cadastro.findByIdAndUpdate(id, req.body.cadastro, {runValidators: true, new: true });
    res.redirect(`/cadastros/${cadastro._id}`);
}