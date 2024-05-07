import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { redirect } from "next/navigation";
import { db } from "../../firebase";
import { faker } from '@faker-js/faker';
import { addDoc, collection, getDoc , serverTimestamp} from "firebase/firestore";


// Fix these to handler error accordingly

export async function signUpWithEmail(data: {
    email: string;
    password: string;
    confirm: string;
}){
    try {
        const auth = getAuth();
        const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
        addUserToDatabase();
        return JSON.stringify(result);
    } catch (error) {
        // Handle error here
        console.error('Error signing up:', error);
        return JSON.stringify({ error: error.message }); // Or handle the error message as you prefer
    }
}

export async function signInWithEmail(data: {
    email: string;
    password: string;
}){
    try {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, data.email, data.password);
        return JSON.stringify(result);
    } catch (error) {
        // Handle error here
        console.error('Error signing up:', error);
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

export async function addUserToDatabase() {
    try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            const colRef = collection(db, "users");

            await addDoc(colRef, {
                email: faker.internet.email(),
                userId: generateRandomUserId(),
                username:faker.internet.userName(),
                isVerified: false,
                timeCreated: serverTimestamp(),


                // email: currentUser.email,
                // userId: currentUser.uid,
                // username: currentUser.displayName,
                // isVarified: currentUser.emailVerified,
                // timeCreated: serverTimestamp,
            });

            console.log('User added to Firestore successfully.');
        } else {
            console.error('No user is currently signed in.');
        }
    } catch (error) {
        console.error('Error adding user to Firestore:', error);
    }
}


function generateRandomUserId() {
    // Generate a random string with the desired format
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let userId = '';
    for (let i = 0; i < 20; i++) {
        userId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return userId;
}




// const randomName = faker.person.fullName(); // Rowan Nikolaus
// const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

// if (currentUser) {
    //     const userEmail = currentUser.email;
    //     console.log("User email:", userEmail);
    // } else {
    //     console.error("No user is currently signed in.");
    // }