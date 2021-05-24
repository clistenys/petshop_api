const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento
{
    adiciona(atendimento, res)
    {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;
    
        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser igual ou maior que a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Nome do cliente deve ter pelo menos cinco caracteres '
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros)
        {
            res.status(400).json(erros);
        }
        else
        {
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sqlCommand = 'INSERT INTO Atendimentos SET ?';
            
            conexao.query(sqlCommand, atendimentoDatado, (erro, resultados) =>
            {
                if(erro)
                {
                    res.status(400).json(erro);
                }
                else
                {
                    res.status(201).json(atendimento);
                }
            });
        }
    }

    lista(res)
    {
        const sqlCommand = 'SELECT * FROM Atendimentos';

        conexao.query(sqlCommand, (erro, resultados) =>
        {
            if(erro)
            {
                res.status(400).json(erro);
            }
            else
            {
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, res)
    {
        const sqlCommand = `SELECT * FROM Atendimentos WHERE id=${id}`;

        conexao.query(sqlCommand, (erro, resultados) =>
        {
            const atendimento = resultados[0];
            if(erro)
            {
                res.status(400).json(erro);
            }
            else
            {
                res.status(200).json(atendimento);
            }
        });
    }

    altera(id, valores, res)
    {
        if(valores.data)
        {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        const sqlCommand = 'UPDATE Atendimentos SET ? WHERE id=?';
        
        conexao.query(sqlCommand, [valores, id], (erro, resultados) => 
        {
            if(erro)
            {
                res.status(400).json(erro);
            }
            else
            {
                res.status(200).json({...valores});
            }
        });
    }

    deleta(id, res)
    {
        const sqlCommand = 'DELETE FROM Atendimentos WHERE id=?';

        conexao.query(sqlCommand, id, (erro, resultados) =>
        {
            if(erro)
            {
                res.status(400).json(erro);
            }
            else
            {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Atendimento;