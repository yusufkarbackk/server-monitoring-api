// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
const secretManager = new SecretManagerServiceClient();
import dotenv from 'dotenv'
dotenv.config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// async function getProjectId() {
//     const client = new SecretManagerServiceClient();
//     const [projectId] = await client.getProjectId();
//     return projectId;
// }

// async function getFirebaseConfig() {
//     if (process.env.NODE_ENV !== 'production') {
//         console.log("dev values")
//         const devFirebaseConfig = {
//             apiKey: process.env.API_KEY,
//             authDomain: process.env.AUTH_DOMAIN,
//             projectId: process.env.PROJECT_ID,
//             storageBucket: process.env.STORAGE_BUCKET,
//             messagingSenderId: process.env.MESSAGING_SENDER_ID,
//             appId: process.env.APP_ID,
//             databaseURL: `https://${process.env.PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app/`
//         };
//         return devFirebaseConfig
//     }
//     else {
//         console.log("prod values")
//         const projectId = await getProjectId()
//         console.log(projectId)
//         const client = new SecretManagerServiceClient();
//         const [version] = await client.accessSecretVersion({
//             name: `projects/${projectId}/secrets/firebaseConfig/versions/latest`,
//         });
//         console.log(version)

//         return JSON.parse(version.payload.data.toString());
//     }
// }

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
//console.log(getFirebaseConfig())
const app = initializeApp(firebaseConfig);
console.log(app)
const database = getDatabase(app)
export default database