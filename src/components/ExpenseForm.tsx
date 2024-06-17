import React, { useState } from 'react';
import { Expense } from './types'; // Asegúrate de que esta importación es correcta según tu estructura de archivos

const ExpenseForm = ({ onAddExpense }: { onAddExpense: (expense: Expense) => void }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('personal');
  const [tipo, setTipo] = useState('expense');
  const [payed, setPayed] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Inicia el estado de carga
    console.log('Submitting expense:', { title, amount, date, description, category, tipo, payed });

    const expense = {
      title,
      amount: parseFloat(amount),
      date,
      description,
      category,
      tipo,
      payed,
    };

    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });

    if (response.ok) {
      const newExpense = await response.json();
      console.log(newExpense);
      onAddExpense(newExpense);
      setDescription('');
      setTitle('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategory('personal');
      setTipo('expense');
      setPayed(false);
    } else {
      console.error('Failed to add expense');
    }

    setLoading(false); // Finaliza el estado de carga
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          disabled={loading}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          disabled={loading}
        >
          <option value="food">Comida</option>
          <option value="transportation">Transporte</option>
          <option value="housing">Diario</option>
          <option value="vehicle">Vehículos</option>
          <option value="clothing">Ropa</option>
          <option value="health">Salud</option>
          <option value="personal">Varios</option>
          <option value="education">Educación</option>
          <option value="entertainment">Entretenimiento</option>
          <option value="savings">Ahorros</option>
          <option value="gifts">Regalos</option>
          <option value="pets">Mascotas</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          disabled={loading}
        >
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Payed</label>
        <input
          type="checkbox"
          checked={payed}
          onChange={(e) => setPayed(e.target.checked)}
          className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
