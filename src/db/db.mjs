// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
const secretManager = new SecretManagerServiceClient();
import dotenv from 'dotenv'
dotenv.config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
async function getSecret(secretName) {
    const [version] = await secretManager.accessSecretVersion({
        name: `projects/YOUR_PROJECT_ID/secrets/${secretName}/versions/latest`,
    });
    return version.payload.data.toString('utf8');
}

async function getProjectId() {
    const client = new SecretManagerServiceClient();
    const [projectId] = await client.getProjectId();
    return projectId;
}


async function getFirebaseConfig() {
    if (process.env.NODE_ENV !== 'production') {
        return {
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            databaseURL: `https://${process.env.PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app/`
        };
    }

    const projectId = await getProjectId()

    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
        name: `projects/${projectId}/secrets/firebase-config/versions/latest`,
    });

    return JSON.parse(version.payload.data.toString());
}

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
const app = initializeApp(getFirebaseConfig());
const database = getDatabase(app)
export default database