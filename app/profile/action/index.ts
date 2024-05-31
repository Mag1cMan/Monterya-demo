"use server"
import { getAuth } from "@firebase/auth";
import { addDoc, collection, doc , getDoc , serverTimestamp} from "firebase/firestore";
import { db } from "../../firebase";



// Add current user Id and use it her eto make it server sided
export async function FetchBalance(user : string) {
    try{
        
        if (user != null) {

            const balanceDocRef = doc(db, "userBalance", user);

            const balanceDoc = await getDoc(balanceDocRef);


            if (balanceDoc.exists()) {
                const balanceData = balanceDoc.data();
                //console.log('Balance Data:', balanceData);
                return JSON.stringify({balanceInfo : balanceData});
            }
            else{
                return JSON.stringify({error : "Data Does Not Exits"});
            }
        }
        else{
            return JSON.stringify({ error: "No Current User" }); // Or handle the error message as you prefer
        }


    } catch (error) {
        console.error('Error Fetcing something from Firestore:', error);
        return JSON.stringify({ error: error.message }); // Or handle the error message as you prefer

    }
}


export async function FetchUser() {
    const repose = await fetch('https://api.monterya.com/AuthTest/users');
    console.log(repose);
    return;
}