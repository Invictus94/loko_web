
  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
  import { doc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  const firebaseConfig = {

    apiKey: "AIzaSyCakAY_11duMLEVgFOuplDM8XuBKZ3E4Cw",

    authDomain: "loko-web-b81bd.firebaseapp.com",

    projectId: "loko-web-b81bd",

    storageBucket: "loko-web-b81bd.appspot.com",

    messagingSenderId: "898595369354",

    appId: "1:898595369354:web:9fb2147d799940a0e89873"

  };



  // Initialize Firebase

  const app = initializeApp(firebaseConfig);


  console.log('config')

// Initialize Firebase


const db = getFirestore(app);

const docRef = doc(db, "test", "260294");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  //let element = document.getElementById('test')
  alert(docSnap.data()["ime"])
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

console.log('init')
