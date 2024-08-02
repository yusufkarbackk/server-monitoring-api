import CryptoJS from "crypto-js";
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.SECRET_KEY

function encrypt(data) {
    //AES-256-CBC 
    return CryptoJS.AES.encrypt(data, secretKey).toString()
}

function decrypt(data) {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return parseFloat(decryptedData); // Convert string back to double
}

export { encrypt, decrypt }