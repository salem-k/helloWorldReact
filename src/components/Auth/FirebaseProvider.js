import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { store } from '~/redux/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { firebaseConfig } from '~/config';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';

// ----------------------------------------------------------------------

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBdZoZoqrYekhaRnZIIChDFqvvehgKMV5A",
    authDomain: "ionic-crud-firebase-c98e4.firebaseapp.com",
    databaseURL: "https://ionic-crud-firebase-c98e4-default-rtdb.firebaseio.com",
    projectId: "ionic-crud-firebase-c98e4",
    storageBucket: "ionic-crud-firebase-c98e4.appspot.com",
    messagingSenderId: "680115969415",
    appId: "1:680115969415:web:d76613e4c9d5acfd538722"
  });
  firebase.firestore();
}

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true
  },
  dispatch: store.dispatch,
  createFirestoreInstance
};

const ADMIN_EMAILS = ['demo@minimals.cc'];

// ----------------------------------------------------------------------

function FirebaseProvider({ children }) {
  const { profile } = false //false //useSelector(state => state.firebase);

  useEffect(() => {
    const Initialise = async () => {
      try {
        firebase.auth().onAuthStateChanged(user => {
          if (user && isLoaded(profile) && !profile.role) {
            firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set(
                {
                  role: ADMIN_EMAILS.includes(user.email) ? 'admin' : 'user'
                },
                { merge: true }
              );
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    Initialise();
  }, [profile]);

  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      {children}
    </ReactReduxFirebaseProvider>
  );
}

export default FirebaseProvider;
