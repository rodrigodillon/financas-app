import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'

import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog'
import {Button} from "primereact/button";

class ConsultaLancamento extends React.Component {

    state = {
        ano              :'',
        mes              :'',
        tipo             :'',
        descricao        :'',
        showConfirmDialog:false,
        lancamentoDeletar:{},
        lancamentos      :[]

    }

    constructor() {
        super();
        this.service = new LancamentoService()
    }

    buscar = () => {
        if(!this.state.ano){
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório.')
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano      : this.state.ano,
            mes      : this.state.mes,
            tipo     : this.state.tipo,
            descricao: this.state.descricao,
            usuario  : usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then( resposta => {
                const lista = resposta.data
                if (lista.length < 1) {
                    messages.mensagemAlerta("Nenhum resutlado encontrado!")
                }
                this.setState({lancamentos: lista})
            }).catch( err => {
                console.log(err)
        })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamento/${id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true , lancamentoDeletar:lancamento})
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false , lancamentoDeletar: {}})
    }

    deletar = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1)
                this.setState({lancamentos:lancamentos, showConfirmDialog:false})

                messages.mensagemSucesso('Lançamento deletado com sucesso!')
            }).catch( err => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar um lançamento')
        })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamento')
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos

                const index = lancamentos.indexOf(lancamento)
                if(index !== -1){
                    lancamento['status'] = status
                    lancamentos[index] = lancamento
                    this.setState({lancamentos})
                }
                messages.mensagemSucesso("Status atualizado com sucesso!")
            })
    }

    render() {
        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos()

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDelecao} className='p-button-secondary'/>
            </div>
        )


        return (
            <Card title="Consulta de Lançamento">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control color" id="inputAno" value={this.state.ano} onChange={event => this.setState({ano: event.target.value})} placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes" className="form-control color" lista={meses} value={this.state.mes} onChange={event => this.setState({mes: event.target.value})} />
                            </FormGroup>
                            <FormGroup htmlFor="inputDesc" label="Descricao: ">
                                <input type="text" className="form-control color" id="inputDesc" value={this.state.descricao} onChange={event => this.setState({descricao: event.target.value})} placeholder="Digite a descrição" />
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: ">
                                <SelectMenu id="inputTipo" className="form-control color" lista={tipos} value={this.state.tipo} onChange={event => this.setState({tipo: event.target.value})}/>
                            </FormGroup>
                            <button onClick={this.buscar} type="button" className="btn btn-success" style={{marginTop:"15px", marginRight:"15px"}}><i className="pi pi-search"></i> Buscar</button>
                            <button  onClick={this.preparaFormularioCadastro} type="bconfirmDialogFooterutton" className="btn btn-danger" style={{marginTop:"15px"}}><i className="pi pi-plus"></i> Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} deleteAction={this.abrirConfirmacao} editAction={this.editar} alterarStatus={this.alterarStatus}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{width:'50vw'}}
                            footer={confirmDialogFooter}
                            modal={true}
                            onHide={() => this.setState({showConfirmDialog:false})}>
                        Confirma a exclusão deste Lançamento ?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamento)