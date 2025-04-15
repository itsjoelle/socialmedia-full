import {
  AdditionalUserInfo,
  UserCredential,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db, provider } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { FormValues, ProfileInfo } from '../interfaces_types/types';

export const signUpEmail = async (data: FormValues) => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = result.user;

    await setDoc(
      doc(db, 'users', user.uid),
      {
        userName: data.name,
        userId: user.uid,
        photo: user.photoURL,
        timestamp: new Date(),
      },
      { merge: true }
    );

    return { status: 'ok', user };
  } catch (error) {
    return { status: 'error', error };
  }
};

export const signInGoogle = async () => {
  try {
    const response: UserCredential = await signInWithPopup(auth, provider);
    const userProfile: ProfileInfo | null | AdditionalUserInfo =
      getAdditionalUserInfo(response);
    const tokenResponse = (response as unknown)?._tokenResponse;

    const userid = tokenResponse?.localId;
    const username = userProfile?.profile?.given_name;
    const photo = userProfile?.profile?.picture;

    await setDoc(
      doc(db, 'users', userid),
      {
        userName: username,
        userId: userid,
        photo: photo,
        timestamp: new Date(),
      },
      { merge: true }
    );

    return { status: 'ok' };
  } catch (error) {
    return { status: 'error', error };
  }
};
