import React, { useState, useEffect } from 'react';

interface Expense {
  title: string;
  amount: number;
  date: string;
  description?: string;
  category?: string;
  tipo?: string; // 'income' o 'expense'
  payed?: boolean;
}

interface ExpenseListProps {
  expenses: Expense[];
  onTogglePayed: (index: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onTogglePayed }) => {
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showUnpaid, setShowUnpaid] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    filterExpenses();
  }, [expenses, startDate, endDate, showUnpaid, filterType, filterCategory]);

  const filterExpenses = () => {
    let filtered = expenses;

    if (startDate) {
      filtered = filtered.filter(expense => new Date(expense.date) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(expense => new Date(expense.date) <= new Date(endDate));
    }

    if (showUnpaid) {
      filtered = filtered.filter(expense => !expense.payed);
    }

    if (filterType) {
      filtered = filtered.filter(expense => expense.tipo === filterType);
    }

    if (filterCategory) {
      filtered = filtered.filter(expense => expense.category === filterCategory);
    }

    setFilteredExpenses(filtered);
  };

  const totalExpenses = filteredExpenses
    .filter(expense => expense.tipo === 'expense')
    .reduce((acc, expense) => acc + expense.amount, 0)
    .toFixed(2);

  const totalIncome = filteredExpenses
    .filter(expense => expense.tipo === 'income')
    .reduce((acc, expense) => acc + expense.amount, 0)
    .toFixed(2);

  const netAmount = (parseFloat(totalIncome) - parseFloat(totalExpenses)).toFixed(2);

  const getRowClassName = (tipo: string | undefined) => {
    if (tipo === 'expense') {
      return 'bg-red-100';
    } else if (tipo === 'income') {
      return 'bg-green-100';
    } else {
      return '';
    }
  };

  const renderAmount = (amount: number, tipo: string | undefined) => {
    const formattedAmount = amount.toFixed(2);
    if (tipo === 'expense') {
      return <span className="text-red-600">-{formattedAmount}</span>;
    } else if (tipo === 'income') {
      return <span className="text-green-600">{formattedAmount}</span>;
    } else {
      return <span>{formattedAmount}</span>;
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Expense List</h2>
      <div className="flex justify-between mb-4">
        <div className="text-3xl font-bold text-red-600">
          Total Gastos: ${totalExpenses}
        </div>
        <div className="text-3xl font-bold text-green-600">
          Diferencia: ${netAmount}
        </div>
      </div>
      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
          placeholder="End Date"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showUnpaid}
            onChange={(e) => setShowUnpaid(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <span className="ml-2">Mostrar no pagados</span>
        </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todos</option>
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
        <input
          type="text"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded"
          placeholder="Categoría"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredExpenses.map((expense, index) => (
            <tr key={index} className={`${getRowClassName(expense.tipo)} hover:bg-gray-100`}>
              <td className="px-6 py-4 whitespace-nowrap">{expense.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{renderAmount(expense.amount, expense.tipo)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.tipo}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={expense.payed}
                  onChange={() => onTogglePayed(index)}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
