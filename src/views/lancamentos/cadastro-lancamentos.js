import React from "react";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import * as messages from '../../components/toastr'

import {withRouter} from "react-router-dom";

import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

class CadastroLancamentos extends React.Component {

    state = {
        id         :null,
        descricao  :'',
        valor      :'',
        mes        :'',
        ano        :'',
        tipo       :'',
        status     :'',
        usuario    :null,
        atualizando:false
    }


    constructor() {
        super();
        this.service = new LancamentoService()
    }

    componentDidMount() {
        const params = this.props.match.params
        if(params.id) {
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizando:true})
                }).catch(err => {
                    messages.mensagemErro(err.response.data)
            })
        }

    }

    submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const {descricao,valor,mes,ano,tipo} = this.state
        const lancamento = {descricao,valor,mes,ano,tipo,usuario: usuarioLogado.id}

        try {
            this.service.validar(lancamento)
        }catch (erro){
            const mensagens = erro.mensagens
            mensagens.forEach(msg => messages.mensagemErro(msg))
            return false
        }

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamento')
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!')
            }).catch(err => {
                messages.mensagemErro(err.response.data)
        })
    }

    atualizar = () => {
        const {descricao,valor,mes,ano,tipo, status , usuario , id} = this.state
        const lancamento = {descricao,valor,mes,ano,tipo,usuario,status,id}

        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamento')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
            }).catch(err => {
            messages.mensagemErro(err.response.data)
        })

    }

    handleChange =  (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }


    render(){

        const tipos = this.service.obterListaTipos()
        const meses = this.service.obterListaMeses()



        return (
           <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
               <div className="row">
                   <div className="col-md-12">
                       <FormGroup id="inputDescricao" label="Descrição: *" >
                            <input id="inputDescricao" type="text" className="form-control color" name="descricao" value={this.state.descricao} onChange={this.handleChange}/>
                       </FormGroup>
                   </div>
               </div>
               <div className="row">
                   <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control color" name="ano" value={this.state.ano} onChange={this.handleChange}/>
                        </FormGroup>
                   </div>
                   <div className="col-md-6">
                       <FormGroup id="inputMes" label="Mês: *">
                           <SelectMenu id="inputMes" lista={meses} className="form-control color" name="mes" value={this.state.mes} onChange={this.handleChange}/>
                       </FormGroup>
                   </div>
               </div>
               <div className="row">
                   <div className="col-md-4">
                       <FormGroup id="inputValor" label="Valor: *">
                           <input id="inputValor" type="text" className="form-control color" name="valor" value={this.state.valor} onChange={this.handleChange}/>
                       </FormGroup>
                   </div>
                   <div className="col-md-4">
                       <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" lista={tipos} className="form-control color" name="tipo" value={this.state.tipo} onChange={this.handleChange}/>
                       </FormGroup>
                   </div>
                   <div className="col-md-4">
                       <FormGroup id="inputStatus" label="Status: ">
                            <input type="text" className="form-control color" disabled value="status" value={this.state.status}/>
                       </FormGroup>
                   </div>
                   <div className="col-md-6">
                       {this.state.atualizando ?
                            (
                                <button onClick={this.atualizar} className="btn btn-success" style={{marginTop:"15px" , marginRight:"15px"}}><i className="pi pi-refresh"/>  Atualizar</button>
                            ) : (
                               <button onClick={this.submit} className="btn btn-success" style={{marginTop:"15px" , marginRight:"15px"}}> <i className="pi pi-save"/>  Salvar</button>
                            )
                        }
                        <button onClick={e =>  this.props.history.push('/consulta-lancamento')} className="btn btn-danger" style={{marginTop:"15px"}}><i className="pi pi-times"/>  Cancelar</button>
                    </div>
               </div>
           </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)