import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer, toast } from 'react-toastify';

import CustomerForm from './CustomerForm';
import ActivityForm from './ActivityForm';


class CustomerList extends Component {
    state = { customers: [], trainings: [
        {date: "", activity:"", duration:""}
    ] };

    componentDidMount() {
        this.loadCustomers();
    }

    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    customers: responseData.content,
                });
            })

        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                trainings: responseData.content,
            });
        })

    }


    onDelClick = (idLink) => {
        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete this?',
            confirmLabel: 'OK',
            cancelLabel: 'CANCEL',
            onConfirm: () => {
                fetch(idLink, { method: 'DELETE' })
                    .then(res => this.loadCustomers())
                    .catch(err => console.error(err))

                toast.success("Delete succeed", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        })
    }


    addCustomer(customer) {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer)
            })
            .then(res => this.loadCustomers())
            .catch(err => console.error(err))
    }

    addActivity(activity) {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activity)
            })
            .then(res => this.loadCustomers())
            .catch(err => console.error(err))
    }


    // Update customer
    updateCustomer(customer, link) {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer)
            })
            .then(
                toast.success("Changes saved", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
            .catch(err => console.error(err))
    }

    renderEditTable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.customers];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ customers: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.customers[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    render() {
        return (
            <div className="App-body">
                <CustomerForm addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
                <ReactTable
                    data={this.state.customers}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: "First Name",
                                    accessor: "firstname",
                                    Cell: this.renderEditTable
                                },
                                {
                                    Header: "Last Name",
                                    accessor: "lastname",
                                    Cell: this.renderEditTable
                                },
                                {
                                    Header: "Street Address",
                                    accessor: "streetaddress",
                                    Cell: this.renderEditTable
                                },
                                {
                                    Header: "Post Code",
                                    accessor: "postcode",
                                    Cell: this.renderEditTable
                                },
                                {
                                    Header: "City",
                                    accessor: "city",
                                    Cell: this.renderEditTable
                                },
                                {
                                    Header: "Email",
                                    accessor: "email",
                                    Cell: this.renderEditTable
                                },
                                {
                                    Header: "Phone",
                                    accessor: "phone",
                                    Cell: this.renderEditTable
                                },
                                {
                                    id: 'button',
                                    sortable: false,
                                    filterable: false,
                                    width: 100,
                                    accessor: 'links[0].href',
                                    Cell: ({ value, row }) => (<button className="btn btn-default btn-link" onClick={() => { this.updateCustomer(row, value) }}>Save</button>)
                                },
                                {
                                    id: 'button',
                                    sortable: false,
                                    filterable: false,
                                    width: 100,
                                    accessor: 'links[0].href',
                                    Cell: ({ value }) => (<button className="btn btn-default btn-link" onClick={() => { this.onDelClick(value) }}>Delete</button>)
                                }
                            ]
                        }
                    ]}

                    SubComponent={row => {
                        return (
                            <div style={{ padding: "20px" }}>
                                <ActivityForm addActivity={this.addActivity} loadCustomers={this.loadCustomers} />
                                <ReactTable
                                    data={this.state.trainings}
                                    columns={[
                                        {
                                            columns: [
                                                {
                                                    Header: "Date",
                                                    accessor: "date",                                
                                                },
                                                {
                                                    Header: "Activity",
                                                    accessor: "activity",         
                                                },
                                                {
                                                    Header: "Duration",
                                                    accessor: "duration",       
                                                },
                                                {
                                                    id: 'button',
                                                    sortable: false,
                                                    filterable: false,
                                                    width: 100,
                                                    accessor: 'links[0].href',
                                                    Cell: ({ value }) => (<button className="btn btn-default btn-link" onClick={() => { this.onDelClick(value) }}>Delete</button>)
                                                }
                                            ]
                                        }
                                    ]}
                                    defaultPageSize={3}
                                    filterable
                                />
                            </div>
                        );
                    }}

                    filterable
                    className="-highlight" >
                </ReactTable>

                <ToastContainer autoClose={2000} />

            </div>
        );
    }
}

export default CustomerList;

