// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { doc, getDoc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
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

//   class Location {
//     constructor (country, state, city) {
//         this.city = city;
//         this.state = state;
//         this.country = country;
//     }
//     // toString() {
//     //     return this.city + ', ' + this.state + ', ' + this.country;
//     // }
// }

// Firestore data converter
// const locationConverter = {
//     toFirestore: (location) => {
//         return {
//             city: location.city,
//             state: location.state,
//             country: location.country
//             };
//     },
//     fromFirestore: (snapshot, options) => {
//         const data = snapshot.data(options);
//         return new Location(data.city, data.state, data.country);
//     }
// };

// Initialize Firebase

const app = initializeApp(firebaseConfig);

async function writeIntoDB(ref) {
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        const drzavaDB = docSnap.data();
        await setDoc(ref, {
            clicks: drzavaDB.clicks + 1
        });
    }
    else {
        await setDoc(ref, {
            clicks: 1
        });
    }
}
// Initialize Firebase

export function tryWrite(drzava) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, 'admin@loko.com', '260294')
        .then(async (userCredential) => {
            // Signed in 

            const db = getFirestore(app);

            //GET

            // const docRef = doc(db, "test", "260294");
            // const docSnap = await getDoc(docRef);

            // if (docSnap.exists()) {
            //   console.log("Document data:", docSnap.data());
            //   //let element = document.getElementById('test')
            // } else {
            //   // doc.data() will be undefined in this case
            //   console.log("No such document!");
            // }


            //SET
            //const drzava = new Location("Bosnia", "Tuzla", "Sarajevo");

            //.withConverter(locationConverter);

            writeIntoDB(doc(db, "drzave", drzava.country));
            writeIntoDB(doc(db, "drzave", drzava.country, "regije", drzava.state));
            writeIntoDB(doc(db, "drzave", drzava.country, "regije", drzava.state, "gradovi", drzava.city));

            console.log('db_write_ok');

            // await setDoc(ref, {
            //             clicks: 1
            //             });



        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

        });
}