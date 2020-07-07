import React, { Component } from 'react';
import { logout } from "../services/auth";

class LogoutModal extends Component {

    sair(){
        logout();
        window.location.reload();

    }

    render(){
        return (
            //    {/* <!--  Logout Modal --> */}
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Você deseja sair?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body"> Selecione a opção "Sair" abaixo se você quer encerrar a sua sessão atual.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <div className="btn btn-primary" onClick={this.sair} >
                                Sair
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogoutModal;
