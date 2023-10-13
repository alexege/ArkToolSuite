import {
  GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    getAuth
  } from 'firebase/auth';
  import { defineStore } from 'pinia';
  import { auth } from '../js/firebase';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
//   import { useNotesStore } from './NotesStore';
  
  export const useAuthStore = defineStore('authStore', () => {
    const user = ref({});
    const router = useRouter();
    // const notesStore = useNotesStore();
    const init = () => {
      onAuthStateChanged(auth, (userDetails) => {
        if (userDetails) {
          const uid = userDetails.uid;
          user.value = { email: userDetails.email, uid };
          router.push({ name: 'notes' });
        //   notesStore.getNotes();
        } else {
          user.value = {};
          router.replace({ name: 'auth' });
        //   notesStore.clearNotes();
        }
      });
    };
    const registerUser = (credentials) => {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          console.log(error.message);
          // ..
        });
    };

    const googleSignin = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
      .then((response) => {
        console.log("successfully sent login attempt with google signin:", response)
        router.push("/")
      })
      .catch((error) => {
        console.log("error logging in with google", error)
      })
    }
  
    const loginUser = (credentials) => {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          router.push("/")
          // ...
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
  
    const logoutUser = () => {
      signOut(auth)
        .then(() => {
          console.log('loggedout');
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    };
  
    return {
      registerUser,
      loginUser,
      logoutUser,
      init,
      user,
      googleSignin
    };
  });
  