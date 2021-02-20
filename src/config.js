export const mapConfig = {
  apiGoogle: process.env.REACT_APP_MAP_GOOGLE,
  apiMapBox: process.env.REACT_APP_MAP_MAPBOX
};

export const firebaseConfig = {
  apiKey: "AIzaSyBdZoZoqrYekhaRnZIIChDFqvvehgKMV5A",
  authDomain: "ionic-crud-firebase-c98e4.firebaseapp.com",
  databaseURL: "https://ionic-crud-firebase-c98e4-default-rtdb.firebaseio.com",
  projectId: "ionic-crud-firebase-c98e4",
  storageBucket: "ionic-crud-firebase-c98e4.appspot.com",
  messagingSenderId: "680115969415",
  appId: "1:680115969415:web:d76613e4c9d5acfd538722"
}


export const cloudinaryConfig = {
  cloudinaryKey: process.env.REACT_APP_CLOUDINARY_KEY,
  cloudinaryPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
  cloudinaryUrl: process.env.REACT_APP_CLOUDINARY_URL
};

export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
