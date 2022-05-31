import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCq8WzwfG91aYA3LLm58ev1-udsGxt_BBw",
    authDomain: "crwn-clothing-db-445ba.firebaseapp.com",
    projectId: "crwn-clothing-db-445ba",
    storageBucket: "crwn-clothing-db-445ba.appspot.com",
    messagingSenderId: "984641034002",
    appId: "1:984641034002:web:385cf5fc2a01149b3dc5cb"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation= {displayName: 'Mike'}) =>{

    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());



    //if user data does not exist
    if(!userSnapshot.exists()){
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try{
         await setDoc(userDocRef, {
           displayName,
           email,
           createdAt,
           ...additionalInformation,
         });
      }catch(error){
        console.log('error creating the user', error.message);
      }
    }
    //if user data exists

    return userDocRef;
    
    //return userDocRef
  };


  export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
    
  }

  export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
    
  }