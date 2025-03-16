import React, { createContext, useState, useContext } from 'react';
import { TenantsContext } from '../pages/Tenants';

export const PaymentsContext = createContext();

export function PaymentsProvider({ children }) {
  const [payments, setPayments] = useState([
    {
      id: 1,
      tenantId: 1,
      date: '2025-01-01',
      amount: 1200,
      status: 'Paid',
    },
    {
      id: 2,
      tenantId: 2,
      date: '2025-01-01',
      amount: 1500,
      status: 'Pending',
    },
  ]);

  const addPayment = (newPayment) => {
    setPayments(prev => [...prev, { ...newPayment, id: prev.length + 1 }]);
  };

  const updatePaymentStatus = (paymentId, status) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId ? { ...payment, status } : payment
    ));
  };

  const getTotalRevenue = () => {
    return payments
      .filter(payment => payment.status === 'Paid')
      .reduce((total, payment) => total + (Number(payment.amount) || 0), 0);
  };

  const getPendingPayments = () => {
    return payments.filter(payment => payment.status === 'Pending').length;
  };

  const getPaymentsByMonth = (month) => {
    return payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate.getMonth() === month;
    });
  };

  return (
    <PaymentsContext.Provider value={{ 
      payments, 
      addPayment, 
      updatePaymentStatus,
      getTotalRevenue,
      getPendingPayments,
      getPaymentsByMonth
    }}>
      {children}
    </PaymentsContext.Provider>
  );
}
