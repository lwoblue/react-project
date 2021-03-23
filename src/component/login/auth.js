import axios from "axios";
// import { auth,adminAuth } from "./../../firebase";
import { auth } from "./../../firebase";
import request from "request-promise";

export function signUp(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

// For Kakao Auth To firebase


/**
 * updateOrCreateUser - Update Firebase user with the give email, create if
 * none exists.
 *
 * @param  {String} userId        user id per app -> uid
 * @param  {String} email         user's email address
 * @param  {String} displayName   user
 * @param  {String} photoURL      profile photo url
 * @return {Prommise<UserRecord>} Firebase user record in a promise
 */
export function updateOrCreateUser(userId, email, displayName, photoURL) {
  console.log("updating or creating a firebase user");
  const updateParams = {
    provider: "KAKAO",
    displayName: displayName,
  };
  if (displayName) {
    updateParams["displayName"] = displayName;
  } else {
    updateParams["displayName"] = email;
  }

  if (photoURL) {
    updateParams["photoURL"] = photoURL;
  }
  console.log("here>>>>>>>>>>>>>>>1");
  console.log(updateParams);
  return auth.updateUser(userId, updateParams).catch((error) => {
    if (error.code === "auth/user-not-found") {
      console.log("here>>>>>>>>>>>>>>>2");
      updateParams["uid"] = userId;
      if (email) {
        updateParams["email"] = email;
      }
      return auth.createUser(updateParams);
    }
    throw error;
  });
}
