/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  applyActionCode,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { renderEmail } from 'react-html-email';

import { cookieKeys, cookieConfig, clearCookies } from './cookie_utils';

import { OCHBackend } from './utils';
import AdminInviteEmail from '../components/Email/EmailTemplates/AdminInviteEmail';

// Using Firebase Web version 9
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const refreshUrl = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_APIKEY}`;

/**
 * Sets a cookie in the browser
 * @param {string} key key for the cookie
 * @param {string} value value for the cookie
 * @param {cookieConfig} config cookie config to use
 */
const setCookie = (key, value, config) => {
  let cookie = `${key}=${value}; max-age=${config.maxAge}; path=${config.path}`;
  if (config.domain) {
    cookie += `; domain=${config.domain}`;
  }
  if (config.secure) {
    cookie += '; secure';
  }
  document.cookie = cookie;
};

/**
 * Returns the current user synchronously
 * @param {Auth} authInstance
 * @returns The current user (or undefined)
 */
const getCurrentUser = authInstance =>
  new Promise((resolve, reject) => {
    const unsubscribe = authInstance.onAuthStateChanged(
      user => {
        unsubscribe();
        resolve(user);
      },
      err => {
        reject(err);
      },
    );
  });

// Refreshes the current user's access token by making a request to Firebase
const refreshToken = async () => {
  const currentUser = await getCurrentUser(auth);
  if (currentUser) {
    const refreshT = currentUser.refreshToken;
    const currentUserId = currentUser.uid;

    const {
      data: { access_token: idToken },
    } = await axios.post(refreshUrl, {
      grant_type: 'refresh_token',
      refresh_token: refreshT,
    });
    // Sets the appropriate cookies after refreshing access token
    setCookie(cookieKeys.ACCESS_TOKEN, idToken, cookieConfig);
    return { idToken, currentUserId };
  }
  return null;
};

/**
 * Makes requests to add user to NPO DB. Deletes user if Firebase error
 * @param {string} email
 * @param {string} userId
 * @param {string} role
 * @param {string} password
 */
const createUserInDB = async (email, firebaseId, role, firstName, lastName) => {
  try {
    console.log(`firebaseId param received as ${firebaseId} and passing it into POST`);
    await OCHBackend.post('/users/', {
      firebaseId,
      firstName,
      lastName,
      email,
      role,
      isActive: true,
      isTrainee: false,
      registered: true,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Logs a user in with email and password
 * @param {string} email The email to log in with
 * @param {string} password The password to log in with
 * @param {string} redirectPath The path to redirect the user to after logging out
 * @param {hook} navigate An instance of the useNavigate hook from react-router-dom
 * @param {Cookies} cookies The user's cookies to populate
 * @returns A boolean indicating whether or not the log in was successful
 */
const logInWithEmailAndPassword = async (email, password, navigate, cookies) => {
  await signInWithEmailAndPassword(auth, email, password);
  // Check if the user has verified their email.
  if (!auth.currentUser.emailVerified) {
    throw new Error('Please verify your email before logging in.');
  }
  cookies.set(cookieKeys.ACCESS_TOKEN, auth.currentUser.accessToken, cookieConfig);
  const user = await OCHBackend.get(`/users/${auth.currentUser.uid}`);
  console.log('Current user: ');
  console.table(user.data);
  return user.data;
};

/**
 * Creates a user in firebase database
 * @param {string} email
 * @param {string} password
 * @returns A UserCredential object from firebase
 */
const createUserInFirebase = async (email, password) => {
  // const user = await createUserWithEmailAndPassword(auth, email, password);
  const user = await OCHBackend.post('/users/firebase', {
    email,
    password,
  });
  return user;
};

/**
 * Creates a user (both in firebase and database)
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @returns A UserCredential object from firebase
 */
const createUser = async (email, password, firstName, lastName, role) => {
  try {
    const user = await createUserInFirebase(email, password);
    await createUserInDB(email, user.data.uid, role, firstName, lastName);
  } catch (err) {
    // TODO: delete firebase account incase of error
    throw new Error(err.message);
  }
};

/**
 * Registers a new user using the email provider
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @param {hook} navigate An instance of the useNavigate hook from react-router-dom
 * @param {string} redirectPath path to redirect users once logged in
 */

const registerWithEmailAndPassword = async (
  email,
  password,
  firstName,
  lastName,
  role,
  navigate,
  redirectPath,
) => {
  try {
    await createUser(email, password, firstName, lastName, role);
  } catch (err) {
    throw new Error(err.message);
  }
  await OCHBackend.delete(`/adminInvite/${email}`);
  navigate(redirectPath);
};

/**
 * Sends a password reset email given an email
 * @param {string} email The email to resend password to
 */
const sendPasswordReset = async email => {
  const user = await OCHBackend.get(`/users/email/${email}`);
  if (user.response.status !== 200 || !user || !user.data) {
    throw new Error(`There is no account associated with the email ${email}.`);
  } else {
    await sendPasswordResetEmail(auth, email);
  }
};

/**
 * Sends password reset to new account created with stated email
 * @param {string} email The email to create an account with
 */

/**
 * Completes the password reset process, given a confirmation code and new password
 * @param {string} code The confirmation code sent via email to the user
 * @param {string} newPassword The new password
 */
const confirmNewPassword = async (code, newPassword) => {
  await confirmPasswordReset(auth, code, newPassword);
};

/**
 * Applies a verification code sent to the user by email or other out-of-band mechanism.
 * @param {string} code The confirmation code sent via email to the user
 */
const confirmVerifyEmail = async code => {
  await applyActionCode(auth, code);
};

/**
 * Logs a user out
 * @param {string} redirectPath The path to redirect the user to after logging out
 * @param {hook} navigate An instance of the useNavigate hook from react-router-dom
 */
const logout = async (redirectPath, navigate, cookies) => {
  await signOut(auth);
  clearCookies(cookies);
  navigate(redirectPath);
};

/**
 * Adds an axios interceptor for auth to given axiosInstance
 * @param {AxiosInstance} axiosInstance instance of axios to apply interceptor to
 */
const addAuthInterceptor = axiosInstance => {
  // This response interceptor will refresh the user's access token using the refreshToken helper method
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 400:
            // check if 400 error was token
            if (data === '@verifyToken no access token') {
              // token has expired;
              try {
                // attempting to refresh token;
                await refreshToken();
                // token refreshed, reattempting request;
                const { config } = error.response;
                // configure new request in a new instance;
                return await axios({
                  method: config.method,
                  url: `${config.baseURL}${config.url}`,
                  data: config.data,
                  params: config.params,
                  headers: config.headers,
                  withCredentials: true,
                });
              } catch (e) {
                return Promise.reject(e);
              }
            } else {
              return Promise.reject(error);
            }
          default:
            return Promise.reject(error);
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return Promise.reject(error);
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.reject(error);
      }
    },
  );
};

/**
 * Cross checks old password by reauthenticating with firebase and applying changes afterwards
 * @param {string} newPassword Password that the user wants to change to
 * @param {string} oldPassword Previous password used to check with firebase
 */
const updateUserPassword = async (newPassword, oldPassword) => {
  const user = auth.currentUser;

  const cred = EmailAuthProvider.credential(user.email, oldPassword);

  try {
    await reauthenticateWithCredential(user, cred);
    // User entered correct credentials
    // Update password
    await updatePassword(auth.currentUser, newPassword);
    console.log('password updated succesfully');
    return 'success';
  } catch (e) {
    console.log(e.code, e.message);
    // Could be incorrect credentials
    if (e.code === 'auth/wrong-password') {
      return 'password';
    }
    if (e.code === 'auth/weak-password') {
      return 'weak';
    }
    return 'error';
  }
};

addAuthInterceptor(OCHBackend);

// -------- ADMIN INVITE ROUTES START HERE ------------------------------------------

const sendInviteEmail = (email, emailTemplate) => {
  OCHBackend.post('/nodemailer/send', {
    email,
    messageHtml: renderEmail(emailTemplate),
  });
};

const initiateInviteProcess = (email, role) => {
  try {
    const id = uuidv4();
    const url = `localhost:3000/register/${id}`;
    console.log('URL passed into register is');
    console.log(url);
    const expireDate = moment().add(1, 'days');
    OCHBackend.post('/adminInvite/', {
      id,
      email,
      role,
      expireDate,
    });

    sendInviteEmail(email, <AdminInviteEmail role={role} url={url} />);
  } catch (err) {
    throw new Error(err.message);
  }
};

export {
  auth,
  useNavigate,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  addAuthInterceptor,
  sendPasswordReset,
  logout,
  refreshToken,
  getCurrentUser,
  confirmNewPassword,
  confirmVerifyEmail,
  initiateInviteProcess,
  updateUserPassword,
};
