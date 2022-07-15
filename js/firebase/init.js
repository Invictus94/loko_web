import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { doc, getDoc, getFirestore, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";

export let reviews = {}

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
const db = getFirestore(app);

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

export function translatePage(shortBrowserLang) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, 'admin@loko.com', '260294')
        .then(async (userCredential) => {

            // Signed in 

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

            await getReviewText(shortBrowserLang);

            console.log('db_tr_ok');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

        });
}

async function getReviewText(shortBrowserLang) {
   // console.log('getReviewText');
///${shortBrowserLang}/reviews

    //reviews = { 'hr' : '' }
    let i = 0;

    const querySnapshot = await getDocs(collection(db, `/dictionary/hr/reviews`));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id);
    //   console.log(doc.data()['text']);

    if(i == 0)
      reviews = { ['hr'] : { [doc.id] : doc.data()['text'] } }; 
    else
      reviews['hr'][doc.id] = doc.data()['text']

      i++;
    });

    //ovo bi trebalo u scripts.js
    console.log(reviews['hr'])
    console.log(reviews['hr']['NC HYPNOTIC'])
    console.log(reviews['hr']['TEST CLUB'])
   // console.log(querySnapshot);

}






