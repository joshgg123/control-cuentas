'use client';

// Importa useState y useEffect desde React
import { useState, useEffect } from 'react';
// Importa el componente de formulario de gastos y la función para agregar gasto desde la API
import ExpenseForm from '../components/ExpenseForm';
import { addExpense, getExpenses } from '../app/firebase/firestoreService'; // Ajusta la ruta según tu estructura de archivos
import { Expense } from '../components/types'; // Ajusta la ruta según tu estructura de archivos

const Home = () => {
  // Define el estado local para los gastos con un tipo inicial
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Efecto de carga inicial para obtener los gastos desde Firestore
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Función para obtener los gastos desde Firestore
  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data); // Aquí TypeScript debería inferir el tipo correctamente como Expense[]
    } catch (error) {
      console.error('Failed to fetch expenses: ', error);
    }
  };

  // Función para manejar la adición de un nuevo gasto
  const handleAddExpense = async (expense: Expense) => {
    try {
      await addExpense(expense);
      // Actualiza el estado local de los gastos después de agregar uno nuevo
      setExpenses((prevExpenses) => [...prevExpenses, expense]);
    } catch (error) {
      console.error('Failed to add expense: ', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      {/* Renderiza el formulario de gastos y pasa la función para agregar gastos */}
      <ExpenseForm onAddExpense={handleAddExpense} />
      {/* Aquí podrías mostrar la lista de gastos si lo deseas */}
    </div>
  );
};

export default Home;
