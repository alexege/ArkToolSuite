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

  import { useUserStore } from './user.store'
 
  export const useAuthStore = defineStore('authStore', () => {
    const user = ref({});
    const router = useRouter();
    // const notesStore = useNotesStore();
    const init = () => {
      onAuthStateChanged(auth, (userDetails) => {
        if (userDetails) {
          const uid = userDetails.uid;
          user.value = { email: userDetails.email, uid };
          // router.push({ name: 'notes' });
        //   notesStore.getNotes();
        } else {
          user.value = {};
          router.replace({ name: 'auth' });
        //   notesStore.clearNotes();
        }
      });
    };
    const registerUser = (credentials) => {
    const userStore = useUserStore()
      console.log("credentials:", credentials)
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(userCredential => {

          if(userCredential.user.uid){
            userStore.register(userCredential.user, credentials.username, credentials.password)
            .then((res) => {
              console.log("Just registered. Now loggign in")
              loginUser(credentials)
            })
            .catch((error) => {
              console.log("Error registering user: ", error);
            })
          }

        })
        .catch((error) => {
          console.log(error.message);
          // ..
        });
    };

    const googleSignin = (credentials) => {
      const provider = new GoogleAuthProvider()
      // const userStore = useUserStore()

      signInWithPopup(getAuth(), provider)
      .then((userCredentials) => {
        console.log("successfully sent login attempt with google signin:", userCredentials)
        
        // If user account with uid exists, set that user to activeUser
        // Else create a new user with uid
        // userStore.register(userCredentials.user, credentials.password)
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
          console.log("user:", user);
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
  