const express = require('express')
const env = require('dotenv')

const {buscarClientes, buscarCliente} = require('./src/DAO/cliente/buscar_cliente.js')
const {incluirCliente} = require('./src/DAO/cliente/inserir_cliente.js')
const {buscarCategorias} = require('./src/DAO/produtos/buscarCategorias.js')
const {buscarProdutos} = require('./src/DAO/produtos/buscarProdutos.js')
const {buscarItemPedido} = require('./src/DAO/pedido/buscarItemPedido.js')
const {buscarPedido} = require('./src/DAO/pedido/buscarPedido.js')
const {buscarEndereco} = require('./src/DAO/endereco/buscarEndereco.js')
const {buscarStatus} = require('./src/DAO/status/buscarStatus.js')
const {conexao, closeConexao, testarConexao} = require('./src/DAO/conexao.js')

const app = express()
env.config()

app.use(
    express.urlencoded({
        extended: true
    })
  )
  
  app.use(express.json())
  


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/empresa_produtos_limpeza/v1/cliente', async (req, res) =>{
    let clientes = await buscarClientes()
    res.json(clientes)
})

app.get('/empresa_produtos_limpeza/v1/cliente/codigo', async (req, res) =>{
    let codigo = parseInt( req.params.codigo)
    let cliente = await buscarCliente(codigo)
    res.json(cliente)
})

app.post('empresa_produtos_limpeza/v1/cliente', async (req, res) =>{
    let {codigo, nome, limite, telefone, id_endereco, id_status} = req.body
    const infos = [codigo, nome, telefone, limite, id_endereco, id_status]
    let result = await incluirCliente(infos)
    res.json(result)
})

app.get('/empresa_produtos_limpeza/v1/categorias', async (req, res) =>{
    let categorias = await buscarCategorias()
    res.json(categorias)
})

app.post('empresa_produtos_limpeza/v1/categorias', async (req, res) =>{
    let {id, nome} = req.body
    const infos = [id, nome]
    let result = await incluirCategorias(infos)
    res.json(result)
})

app.get('/empresa_produtos_limpeza/v1/produtos', async (req, res) =>{
    let produtos = await buscarProdutos()
    res.json(produtos)
})

app.post('empresa_produtos_limpeza/v1/produtos', async (req, res) =>{
    let {codigo, nome, id_categoria, preco} = req.body
    const infos = [codigo, nome, id_categoria, preco]
    let result = await incluirProdutos(infos)
    res.json(result)
})

app.get('/empresa_produtos_limpeza/v1/itempedido', async (req, res) =>{
    let itempedido = await buscarItemPedido()
    res.json(itempedido)
})

app.post('empresa_produtos_limpeza/v1/itempedido', async (req, res) =>{
    let {id, id_pedido, id_produto, qnt} = req.body
    const infos = [id, id_pedido, id_produto, qnt]
    let result = await incluirItemPedido(infos)
    res.json(result)
})

app.get('/empresa_produtos_limpeza/v1/pedido', async (req, res) =>{
    let pedido = await buscarPedido()
    res.json(pedido)
})

app.post('empresa_produtos_limpeza/v1/pedido', async (req, res) =>{
    let {numero, data_elaboracao, cliente_id} = req.body
    const infos = [numero, data_elaboracao, cliente_id]
    let result = await incluirPedido(infos)
    res.json(result)
})

app.get('/empresa_produtos_limpeza/v1/endereco', async (req, res) =>{
    let endereco = await buscarEndereco()
    res.json(endereco)
})

app.post('empresa_produtos_limpeza/v1/endereco', async (req, res) =>{
    let {id, logradouro, cep, numero, bairro,  cidade} = req.body
    const infos = [id, logradouro, cep, numero, bairro,  cidade]
    let result = await incluirEndereco(infos)
    res.json(result)
})

app.get('/empresa_produtos_limpeza/v1/status', async (req, res) =>{
    let status = await buscarStatus()
    res.json(status)
})


app.post('empresa_produtos_limpeza/v1/status', async (req, res) =>{
    let {id, nome} = req.body
    const infos = [id, nome]
    let result = await incluirStatus(infos)
    res.json(result)
})

const porta = 3000

app.listen(porta, () => {
    console.log("Operando na porta" + porta) 
    testarConexao(conexao())
})