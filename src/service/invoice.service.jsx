import React from 'react';

const { createCongtext, useContext } = React;

export const InvoiceProvider = (props) => {
    
    const getAll = () => {
        return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];
    }

    const getDaily = () => {
      return JSON.parse(localStorage.getItem(DAILY_STORAGE_KEY)) || [];
    }

    const add = (newInvoice) => {
        const actualInvoiceData = this.getDaily();

        if (actualInvoiceData.length) {
            newInvoice.id = Math.max.apply(Math, actualInvoiceData.map((o) => o.id)) + 1 || 0;
        } else {
            newInvoice.id = 1;
        }

        actualInvoiceData.push(newInvoice);
        this.processData(actualInvoiceData);
    }

    const remove = () => (id, removeFromHistory = false) => {
  
      let actualInvoiceData = [];
  
      if (!removeFromHistory) {
        actualInvoiceData = this.getDaily();
      } else {
        actualInvoiceData = this.getAll();
      }
  
      const indexToRemove = actualInvoiceData.findIndex(x => x.id === id);
      if (indexToRemove !== -1) {
        const removed = actualInvoiceData.splice(indexToRemove, 1);
      }
  
      this.processData(actualInvoiceData, removeFromHistory);
    }

    const removeAll = () => {
      this.processData([], false);
      this.processData([], true);
    }

    const processData = () => (data, removeFromHistory = false) => {
  
      if (!removeFromHistory) {
        localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(data));
        this.dailyDataSubject.next(data);
      } else {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(data));
        this.historyDataSubject.next(data);
      }
    }

    const mergeData = () => {
      const dailyInvoiceData = this.getDaily();
      const historyInvoiceData = this.getAll();
  
      let lastId = Math.max.apply(Math, historyInvoiceData.map((o) => o.id)) + 1 || 0;
  
      dailyInvoiceData.forEach(dailyInvoice => {
        dailyInvoice.id = lastId;
        historyInvoiceData.push(dailyInvoice);
        lastId++;
      });
  
      this.processData([], false);
      this.processData(historyInvoiceData, true);
    }
}
