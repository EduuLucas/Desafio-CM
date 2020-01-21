import firebase from "react-native-firebase";

export function Login ( email, password ) {
  firebase.auth().signInWithEmailAndPassword( email, password)
  .then((value) => console.log("teste"));
}

export function Signup({ email, password, displayName }) {
  firebase.auth().createUserWithEmailAndPassword( email, password )
  .then((userInfo) => {
    console.log(userInfo);
    userInfo.user.updateProfile({displayName: displayName.trim()})
  })
}

export function Signout(onSignedOut) {
  firebase.auth().signOut()
  .then(() => {
    console.log("signed out");
    onSignedOut();
  })
}