
import {
  db, collection, addDoc, getDocs, auth, serverTimestamp, query, orderBy, limit, doc, updateDoc, getDoc, onSnapshot
} from './init.js';

// Creating Posts collection and adding new docs to collection
const createPost = async (review, movie, country) => {
  let userName;
  if (auth.currentUser.displayName === null) {
    userName = auth.currentUser.email;
  } else {
    userName = auth.currentUser.displayName;
  }
  const docRef = await addDoc(collection(db, 'posts'), {
    userName,
    userId: auth.currentUser.uid,
    review,
    movie,
    country,
    date: Date(Date.now()), // cambiar por TIMESTAMP
  });
  return docRef.id;
};

// Reading Post
const readingPost = (callback) => {
  const result = onSnapshot(collection(db, 'posts'),callback); // result es querySnapshot, devuelve la colección completa
  //const q = query(result.query, orderBy('date', 'desc')); // q hace una búsqueda, a lo que hay que aplicar filtro para que devuelva una colección filtrada
  // console.log(q);
  //const filterQ = await getDocs(q);
  // console.log(filterQ);
  return result;
};

// Country View Posts
const countryPosts = async (country) => {
  const q = query(collection(db, 'posts'), where('country', '==', country), orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  return filterQ.docs;
};

// Edit Post
const editPost = async (id) => {
  const postRef = doc(db, 'posts', id);
  await updateDoc(postRef, {
    review: 'soy un n',
  });
};

// Get one Doc
const gettingDoc = async (id) => {
  const postRef = doc(db,'posts',id);
  const result = await getDoc(postRef)
  return result.data();
};

export {
  createPost, readingPost, countryPosts, editPost, gettingDoc,
};

// const q = query(result.query, orderBy('date', 'desc'), limit(5)); // , limit(n)
