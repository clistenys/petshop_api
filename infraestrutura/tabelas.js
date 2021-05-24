class Tabelas 
{
    init(conexao)
    {
        this.conexao = conexao;
        this.criarAtendimentos();
    }

    criarAtendimentos()
    {
        const sqlCommand = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50), pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';
        
        this.conexao.query(sqlCommand, erro =>
        {
            if(erro)
                {
                console.log(erro);
            }
            else
            {
                console.log('Tabelas Atendimentos criada com sucesso');
            }
        });
    }
}

module.exports = new Tabelas;