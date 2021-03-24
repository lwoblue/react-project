import axios from "axios";
import { auth } from "./../../firebase";
import request from "request-promise";

export function signUp(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}