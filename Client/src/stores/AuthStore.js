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
  import { useUserStore } from './user.store';
 
  export const useAuthStore = defineStore('authStore', () => {
    const user = ref({});
    const router = useRouter();
    const userStore = useUserStore()

    const init = () => {
      console.log("[AuthStore] - init");
      onAuthStateChanged(auth, (userDetails) => {
        if (userDetails) {
          const _id = userDetails.uid;
          user.value = { email: userDetails.email, _id };
          userStore.getActiveUser(user)
        } else {
          user.value = {};
          router.replace({ name: 'auth' });
        }
      });
    };

    const registerUser = (credentials) => {
      
      console.log("[AuthStore] - registerUser");
      const userStore = useUserStore()
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(userCredential => {

          if(userCredential.user.uid){
            userStore.register(userCredential.user, credentials.username, credentials.password)
            .then(() => {
              // loginUser(credentials)
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
      console.log("[AuthStore] - loginUser - credentials:", credentials);

      //Perform Firebase login
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          
          // Signed in
          const user = userCredential.user;
          console.log("[AuthStore] - loginUser - User: ", user)
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
          console.log("error: ", error)
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
  