import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
// Reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyAW8LGtXG1iiCsIWzUw1X3Ff7jcPqfJL3g",
  authDomain: "reactclientpanel-82c57.firebaseapp.com",
  databaseURL: "https://reactclientpanel-82c57.firebaseio.com",
  projectId: "reactclientpanel-82c57",
  storageBucket: "reactclientpanel-82c57.appspot.com",
  messagingSenderId: "212348304161"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

const initialState = {};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
