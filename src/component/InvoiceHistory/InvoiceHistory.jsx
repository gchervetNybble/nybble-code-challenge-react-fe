import React from 'react';
import { connect } from 'react-redux';

const InvoiceHistory = ({invoices, removeInvoice, removeAll}) => (
    <section>
        <h2>InvoiceHistory</h2>
        <div class="contenedor-de-jugadores">
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Invoice Number</th>
                            <th scope="col">Net</th>
                            <th scope="col">% Tax</th>
                            <th scope="col">Tax</th>
                            <th scope="col">Total</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                invoices.map(invoice => (
                                <tr>
                                    <th scope="row">{ invoice.id }</th>
                                    <td>{ invoice.invoiceNumber }</td>
                                    <td>{ invoice.net}</td>
                                    <td>{ invoice.taxPercentage / 100}</td>
                                    <td>{ (invoice.net * (1 + (invoice.taxPercentage/100)))}</td>
                                    <td>{ invoice.net * (1 + (invoice.taxPercentage/100))}</td>
                                    <td><button type="button" class="btn btn-danger w-50">Remove</button></td>
                                </tr>
                                ))
                            }                                
                        </tbody>
                    </table>
                </div>
            </div>
                    
            }
            
        </div>
    </section>
)

// Here, the properties that came as props
const mapStateToProps = state => ({
    invoices: state.invoices,
    invoicesPerPage: state.invoicesPerPage
})

// Here, the methods that came as props
const mapDispatchToProps = dispatch => ({})


export default connect(mapStateToProps, mapDispatchToProps)(InvoiceHistory)