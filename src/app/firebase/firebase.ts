import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDJDatBR_SwxzylKCAmalLIZdw8J41U-mY",
    authDomain: "gestiones-y-servicios-en-obra.firebaseapp.com",
    projectId: "gestiones-y-servicios-en-obra",
    storageBucket: "gestiones-y-servicios-en-obra.appspot.com",
    messagingSenderId: "323906430840",
    appId: "1:323906430840:web:bfbff4c92afbdf6f9c0a8d",
    measurementId: "G-9KLP7RGDV1"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const createExpensesCollection = async () => {
  const expensesCollectionRef = collection(db, 'expenses');
  const querySnapshot = await getDocs(expensesCollectionRef);

  if (querySnapshot.empty) {
    console.log('La colección "expenses" no existe. Creándola...');
    // Añade un documento inicial si lo deseas
     await addDoc(expensesCollectionRef, { title: 'Initial Expense', amount: 100 });
  } else {
    console.log('La colección "expenses" ya existe.');
  }
};

createExpensesCollection().catch(error => {
  console.error('Error creando la colección "expenses":', error);
});
