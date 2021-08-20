import React from 'react'
import currencyFormater from 'currency-formatter'

function LancamentosTable (props) {


    const rows = props.lancamentos.map( lancamento => {
        return (
            <tr style={{color:"white"}} key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormater.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                            type="button" className="btn btn-success"
                            style={{marginRight:'15px'}}
                            disabled={lancamento.status !== 'PENDENTE'}
                            title="Efetivar" >
                                <i className="pi pi-check"/>
                    </button>
                    <button onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                            type="button" className="btn btn-warning"
                            style={{marginRight:'15px'}}
                            disabled={lancamento.status !== 'PENDENTE'}
                            title="Cancelar" >
                                <i className="pi pi-times"/>
                    </button>
                    <button type="button"
                            className="btn btn-primary"
                            style={{marginRight:'15px'}}
                            onClick={e => props.editAction(lancamento.id)}
                            title="Editar" >
                                <i className="pi pi-pencil" />
                    </button>
                    <button type="button"
                            className="btn btn-danger"
                            onClick={e => props.deleteAction(lancamento)}
                            title="Deletar">
                                <i className="pi pi-trash"/>
                    </button>
                </td>
            </tr>
        )
    })


    return (
        <table className="table table-hover">
            <thead>
                <tr style={{color:"white"}}>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default LancamentosTable