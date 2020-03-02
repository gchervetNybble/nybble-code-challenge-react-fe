import React from 'react';
import { Provider } from 'react-redux';
import store from './store/invoiceStore';
import './App.css';
import InvoiceLoad from './component/InvoiceLoad/InvoiceLoad';
import InvoiceHistory from './component/InvoiceHistory/InvoiceHistory';
import { Rtif } from './util/rtif'

let showHistory = false;
const App = () => (
  <Provider store={store}>
    <main>
      <Rtif boolean={!showHistory}><InvoiceLoad /></Rtif>
      <Rtif boolean={showHistory}><InvoiceHistory /></Rtif>
    </main>
  </Provider>
)

export default App;
