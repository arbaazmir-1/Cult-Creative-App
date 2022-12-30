import {
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAIL,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_FAIL,
  JOB_LIST_LOAD_MORE_REQUEST,
  JOB_LIST_LOAD_MORE_SUCCESS,
  JOB_LIST_LOAD_MORE_FAIL,
} from "../constants/jobConstants";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  getDoc,
  where,
  doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

let firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
let firebaseAuthDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
let firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
let firebaseStorageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
let firebaseMessagingSenderId =
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
let firebaseAppId = process.env.REACT_APP_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const listJobs = () => async (dispatch) => {
  try {
    let querySnapshot;

    dispatch({ type: JOB_LIST_REQUEST });
    let firstQuery = query(
      collection(db, "jobs"),
      orderBy("postedDateTime", "desc"),
      limit(3)
    );
    querySnapshot = await getDocs(firstQuery);
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: JOB_LIST_SUCCESS, payload: jobs });
  } catch (error) {
    dispatch({ type: JOB_LIST_FAIL, payload: error.message });
  }
};

export const listMoreJobs = (lastJob) => async (dispatch) => {
  try {
    let querySnapshot;
    dispatch({ type: JOB_LIST_LOAD_MORE_REQUEST });
    let nextQuery = query(
      collection(db, "jobs"),
      orderBy("postedDateTime", "desc"),
      startAfter(lastJob.postedDateTime),
      limit(3)
    );
    querySnapshot = await getDocs(nextQuery);
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push({ ...doc.data(), id: doc.id });
    });
    if (jobs.length === 0) {
      dispatch({ type: JOB_LIST_LOAD_MORE_FAIL, payload: "No more jobs" });
    } else {
      dispatch({ type: JOB_LIST_LOAD_MORE_SUCCESS, payload: jobs });
    }
  } catch (error) {
    dispatch({ type: JOB_LIST_LOAD_MORE_FAIL, payload: error.message });
  }
};

export const listJobDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: JOB_DETAILS_REQUEST });
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch({ type: JOB_DETAILS_SUCCESS, payload: docSnap.data() });
    } else {
      dispatch({ type: JOB_DETAILS_FAIL, payload: "Job not found" });
    }
  } catch (error) {
    dispatch({ type: JOB_DETAILS_FAIL, payload: error.message });
  }
};

export const listJobsFilters = (location, type, salary) => async (dispatch) => {
  try {
    let intSalary = parseInt(salary);
    dispatch({ type: JOB_LIST_REQUEST });
    let search = query(
      collection(db, "jobs"),

      where("employmentType", "==", `${type}`),
      where("salary", ">", intSalary),
      where("location", "==", `${location}`)
    );

    const querySnapShot = await getDocs(search);

    const jobs = [];
    querySnapShot.forEach((doc) => {
      jobs.push({ ...doc.data(), id: doc.id, type: "filter" });
    });

    dispatch({ type: JOB_LIST_SUCCESS, payload: jobs });
  } catch (error) {
    dispatch({ type: JOB_LIST_FAIL, payload: error.message });
  }
};
