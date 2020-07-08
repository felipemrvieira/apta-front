import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from "../../services/api";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Moment from 'react-moment'


const translations = {
    pageText: 'Página',
    ofText: 'de',
    rowsText: 'Linhas',
    previousText: 'Anterior',
    nextText: 'Próxima',
    loadingText: 'Carregando...'
};

const columns = [
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Ações',
        accessor: 'id',
        Cell: row => (
            <div>
                <Link className="btn btn-light btn-icon-split" to={`/appointments/${row.value}`}>
                    <span className="icon text-gray-600">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className="text">Visualizar</span>
                </Link>
            </div >
        )
    },
]

class Appointment extends Component {
    constructor(props) {
        super(props)
        this.state = {
          appointment: {
            id: "",
            services: [],
            address:{}
          },
          redirect: false,
          show: false,
          setShow: false
        }
    }

    loadAppointment = async () => {
        try {
            const response = await api.get(`appointments/${this.props.idAppointment}`);
            const appointment = response.data;
            console.log(appointment)
            this.setState({ appointment: appointment });
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
      this.loadAppointment();
    }

    confirmAppointment = async (appointment) => {
        try {
            if (window.confirm(`Tem certeza que deseja confirmar o agendamento: "${appointment.id}"?`)) {
                await api.patch(`appointments/${appointment.id}`, {"status": "confirmed"} );
                this.setState({
                    redirect: true
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/appointments" />;
        }

        const appointment = this.state.appointment;

        console.log(appointment)

        return (
            <div className="">

                <div className="row">
                    <div className="col-md-12">
                        {/* Card */}
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Informações do Agendamento</h6>
                                <div className="dropdown no-arrow">
                                    <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </div>
                                    <div id="dropdown-article-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                        <div className="dropdown-header">Ações do Agendamento:</div>
                                        {/* <Link className="dropdown-item" to={`/appointments/edit/${appointment.id}`}>
                                            Editar
                                        </Link>
                                        <div className="dropdown-divider"></div>*/}
                                        <div
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => this.confirmAppointment(appointment)}
                                        >Confirmar agendamento</div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">

                              <p><strong>Cliente: </strong>{appointment.customer_name}</p>
                              <p><strong>Horário: </strong>
                                <Moment format="DD.MM.YYYY - HH:MM">
                                  {appointment.created_at}
                                </Moment>
                              </p>
                              <p>
                                <strong>Endereço: </strong>
                                {appointment.address.street +", " + appointment.address.neighborhood+", "
                                + appointment.address.number+", " + appointment.address.city}
                              </p>
                              <p><strong>Data da Solicitação: </strong>
                                <Moment format="DD.MM.YYYY - HH:MM">
                                  {appointment.created_at}
                                </Moment>
                              </p>
                              <p><strong>Status: </strong>{appointment.status}</p>

                            </div>
                        </div>
                        {/* Card */}
                    </div>
                </div>
            </div>
        );
    }
}
export default Appointment;

