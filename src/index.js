import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA2SSM0xzS3yxgll9d54WCKuiyvRHJExJU',
  authDomain: 'fir-9-568a0.firebaseapp.com',
  projectId: 'fir-9-568a0',
  storageBucket: 'fir-9-568a0.appspot.com',
  messagingSenderId: '86043521754',
  appId: '1:86043521754:web:fb59902fa9592e93ee2be3',
};
// init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection reference
const colRef = collection(db, 'books');

// real time collection data
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding docs
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});
// deleting docs
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
