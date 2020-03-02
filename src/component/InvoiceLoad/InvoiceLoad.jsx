import React from 'react';
import { connect } from 'react-redux';

class InvoiceLoad extends React.Component {

    newInvoice = {};
    invoices = [];
    invoiceData = [];

    taxes = [];

    constructor(props) {
        super(props);
        this.newInvoice = {
            id: 0,
            invoiceNumber: '',
            net: '',
            taxPercentage: ''
        };
        this.state = props;
        this.state = {
            newInvoice: this.newInvoice,
            invoices: props.invoices
        };
        this.taxes = [0, 10.5, 15, 25];
    }

    submitHandler = (event) => {
        event.preventDefault();
        const newInvoice = { ...this.state.newInvoice };
        if(this.state.newInvoice && this.state.newInvoice.id == 0) {
            // newInvoice.id = this.state.invoices.length+1;
            newInvoice.id = Math.max.apply(Math, this.state.invoices.map((invoice) => { return invoice.id + 1; }))
        }
        let invoices = this.state.invoices;
        invoices.push(newInvoice);
        this.setState({ newInvoice: {
            id: 0,
            invoiceNumber: '',
            net: '',
            taxPercentage: ''
        }, invoices })
        this.resetValues();
    }

    invoiceNumberHandler = (event) => {
        this.newInvoice.invoiceNumber = event.target.value
        this.setState({ newInvoice: this.newInvoice })
        console.log("Added number");
        console.log(this.state.newInvoice);
    }

    invoiceNetHandler = (event) => {
        this.newInvoice.net = event.target.value
        this.setState({ newInvoice: this.newInvoice })
        console.log("Added net");
        console.log(this.state.newInvoice);
    }

    invoiceTaxHandler = (event) => {
        this.newInvoice.taxPercentage = event.target.value
        this.setState({ newInvoice: this.newInvoice })
        console.log("Added tax");
        console.log(this.state.newInvoice);
    }

    resetValues = () => {
        document.getElementById('invoiceLoadEl').reset();
    }

    removeFromDaily = (index) => {
        let newInvoiceList = [...this.state.invoices];
        newInvoiceList.splice(index, 1);
        if (index >= 0) {
            this.setState({ invoices: newInvoiceList });
        }
    }

    processAndContinue = () => {

    }
    
    render() {
        return(
            <section>
                <h2>Invoice Load</h2>
                <div className="invoice-load-container">
                    <div className="row justify-content-center">
                        <form id="invoiceLoadEl" className="col-md-10" onSubmit={this.submitHandler}>
                            <div className="row">
                                <div className="col-md-2">
                                    <label htmlFor="invoiceNumberInput">Invoice Number</label>
                                    <input 
                                        type='text'
                                        name='number'
                                        onChange={this.invoiceNumberHandler}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="invoiceNetInput">Net</label><br />
                                    <input 
                                        type='number'
                                        name='net'
                                        onChange={this.invoiceNetHandler}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="invoiceTaxInput">% Tax</label>
                                    <select  className=" w-100"
                                        type='number'
                                        name='tax'
                                        onChange={this.invoiceTaxHandler}
                                    >
                                    {
                                        this.taxes.map(tax => (
                                            <option key={tax} value={tax}>{tax}</option>
                                        ))
                                    }
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <input
                                        disabled={!this.state.newInvoice.invoiceNumber || !this.state.newInvoice.net}
                                        className="button w-100 button add"
                                        type='submit'
                                    />
                                </div>
                                <div className="col-md-2">
                                    <input
                                        className="button w-100 button remove"
                                        type='reset'
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <table className="table table-striped">
                                {this.invoiceData}
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
                                        this.state.invoices.map((invoice, index) => (
                                        <tr key={invoice.id}>
                                            <th scope="row">{ invoice.id }</th>
                                            <td>{ invoice.invoiceNumber }</td>
                                            <td>{ invoice.net}</td>
                                            <td>{ invoice.taxPercentage / 100}</td>
                                            <td>{ (invoice.net * (1 + (invoice.taxPercentage/100)))}</td>
                                            <td>{ invoice.net * (1 + (invoice.taxPercentage/100))}</td>
                                            <td><button type="button" className="btn btn-danger w-50" index={index} onClick={() => this.removeFromDaily(index)}>Remove</button></td>
                                        </tr>
                                        ))
                                    }   
                                </tbody>
                            </table>      
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-8"></div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-primary w-100" onClick={this.processAndContinue()}>Process and Continue</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

// Here, the properties that came as props
const mapStateToProps = state => ({
    invoices: state.invoices,
    invoicesPerPage: state.invoicesPerPage
})

// Here, the methods that came as props
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceLoad)