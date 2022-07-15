import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { doc, getDoc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {

    apiKey: "AIzaSyCakAY_11duMLEVgFOuplDM8XuBKZ3E4Cw",

    authDomain: "loko-web-b81bd.firebaseapp.com",

    projectId: "loko-web-b81bd",

    storageBucket: "loko-web-b81bd.appspot.com",

    messagingSenderId: "898595369354",

    appId: "1:898595369354:web:9fb2147d799940a0e89873"

};

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

export function tryWrite(drzava) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, 'admin@loko.com', '260294')
        .then(async (userCredential) => {

            // Signed in 

            const db = getFirestore(app);

            writeIntoDB(doc(db, "views", drzava.country));
            writeIntoDB(doc(db, "views", drzava.country, "regije", drzava.state));
            writeIntoDB(doc(db, "views", drzava.country, "regije", drzava.state, "gradovi", drzava.city));

            console.log('db_w_ok');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

        });
}

export async function translatePage(shortBrowserLang) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, 'admin@loko.com', '260294')
        .then(async (userCredential) => {

            // Signed in 
            const db = getFirestore(app);

            document.getElementById('page-top').classList.add("d-none");

            const docRef = doc(db, 'dictionary', shortBrowserLang);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                let json = docSnap.data();

                Object.keys(json).forEach((key) => {
                  
                  document.getElementById(key).innerHTML = json[key];

                });

                document.getElementById('page-top').classList.remove("d-none");

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

            console.log('db_tr_ok');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

        });
}







