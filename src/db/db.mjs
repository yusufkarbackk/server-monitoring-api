// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
const secretManager = new SecretManagerServiceClient();
import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    databaseURL: `https://${process.env.PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app/`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//console.log(app)
const database = getDatabase(app)
export default database