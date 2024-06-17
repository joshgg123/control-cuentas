
import { NextRequest, NextResponse } from 'next/server';
import { addExpense, getExpenses } from '../../firebase/firestoreService'; // Ajusta la ruta según tu estructura de archivos
import { Expense } from '../../../components/types';

// Ruta para manejar el método POST
export async function POST(request: NextRequest) {
  try {
    // Obtiene el objeto expense desde el body de la solicitud
    const expense: Expense = await request.json();
    
    // Agrega el expense a Firestore
    await addExpense(expense);
    
    // Retorna una respuesta con el nuevo expense y código 201 (Created)
    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error('Failed to add expense: ', error);
    // Retorna un error con código 500 (Internal Server Error)
    return 
  }
}

// Ruta para manejar el método GET
export async function GET() {
  try {
    // Obtiene todos los expenses desde Firestore
    const expenses = await getExpenses();
    
    // Retorna una respuesta con todos los expenses y código 200 (OK)
    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch expenses: ', error);
    // Retorna un error con código 500 (Internal Server Error)
    return 
  }
}
