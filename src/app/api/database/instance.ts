import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import serviceAccount from "../../../../credentials.json";

export const app = initializeApp(serviceAccount);

export const firestore = getFirestore();
