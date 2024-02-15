import * as firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBugfH30dUQMtkjgPrrKvSxLWVwpC_NrNs",
    authDomain: "swapit-83678.firebaseapp.com",
    projectId: "swapit-83678",
    storageBucket: "swapit-83678.appspot.com",
    messagingSenderId: "430064580950",
    appId: "1:430064580950:web:c63b698820b8d4bfcdfef7",
    measurementId: "G-0LVLMEM448"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

/* const uploadImageToStorage = (path, imageName, callback) => {
    let reference = storage().ref(imageName);         // 2
    let task = reference.putFile(path);               // 3

    task.then(callback(null, data)).catch(callback(err, null));
}
 */
export { storage, firebase as default };
