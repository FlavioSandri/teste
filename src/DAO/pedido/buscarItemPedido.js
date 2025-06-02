const {conexao} = require('../conexao.js')


async function buscarItemPedido(){
    const sql = `SELECT * FROM tbl_itempedido;`
    
    const conn = await conexao()
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

module.exports = {buscarItemPedido}