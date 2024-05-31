import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { redirect } from "next/navigation";
import { db } from "../../firebase";
import { faker } from '@faker-js/faker';
import { addDoc, collection, doc, getDoc , serverTimestamp, setDoc} from "firebase/firestore";
import { subscribe } from "diagnostics_channel";


// Fix these to handler error accordingly

export async function CheckDupes(data: {
    email: string;
    password: string;
    confirm: string;
}) {
    try{
        console.log("Sending POST request with email:", data.email);


        const json = {email: data.email};
        console.log(json);
        const auth = getAuth();
        const response = await fetch("https://api.monterya.com/AuthTest/Web/Checkduplicate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json), // body data type must match "Content-Type" header
        });

        console.log(response);

    } 
    catch (error) {
        // Handle error here
        console.error('Error signing up:', error);
        return JSON.stringify({ status: error.message }); // Or handle the error message as you prefer
    }
}

export async function signUpWithEmail(data: {
    email: string;
    password: string;
    confirm: string;
}){
    try {
        const auth = getAuth();
        const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
        addUserToDatabase();
        return JSON.stringify({status : 200});
    } catch (error) {
        // Handle error here
        console.error('Error signing up:', error);
        return JSON.stringify({ status: error.message }); // Or handle the error message as you prefer
    }
}

export async function signInWithEmail(data: {
    email: string;
    password: string;
}){
    try {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, data.email, data.password);
        return JSON.stringify({status : 200});
    } catch (error) {
        // Handle error here
        console.error('Error signing In:', error);
        return JSON.stringify({ error: error.message }); // Or handle the error message as you prefer
    }
}

// FIX THIS  WHY CAN"T I GET CURRETN SESSION !!
export async function readUserSession(){
    const auth = getAuth();
    
    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in", user);
        } else {
            console.log("No user is signed in");
        }
    });
}


export async function AfterGoogleSignUp() {
    console.log("Trigger After goolg login")
    addUserToDatabase();
}

export async function addUserToDatabase() {
    try {

        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            console.log("Add user to database ")

            const docRef = doc(db, "users", currentUser.uid);
            console.log(currentUser.uid);
            // Set the document data
            await setDoc(docRef, {
                email: currentUser.email,
                userId: currentUser.uid,
                username: null,
                DisplayName: null,
                EmailVerified: false,
                timeCreated: serverTimestamp(),
            });

            const colRefC = doc(db, "userBalance", currentUser.uid);

            const a = await setDoc(colRefC, {
                userId: currentUser.uid,
                balance : 0,
                Gold:0,
                Silver:0,
                subscription: false,
            })

            console.log('User added to Firestore successfully.');
        } else {
            console.error('No user is currently signed in.');
        }
    } catch (error) {
        console.error('Error adding user to Firestore:', error);
    }
}





