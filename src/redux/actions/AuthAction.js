import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';
import {
  GET_USER_DATA,
  SET_LOGIN,
  SET_LOGOUT,
  UPDATE_IMAGE,
  SET_USER_LOCATION,
} from './types';
export const getSingleData = id => async dispatch => {
  // try {
  //   const data = await database()
  //     .ref('UsersList/-M5VglMpoECkkBq9J8v6')
  //     .once('value')
  //     .then(snapshot => {
  //       console.log('User data: ', snapshot.val());
  //     });
  //   // dispatch({
  //   //   type: GET_USER_DATA,
  //   //   payload: data,
  //   // });
  // } catch (error) {
  //   console.log(error);
  // }
};

export const setNewPicutre = url => async dispatch => {
  try {
    dispatch({
      type: UPDATE_IMAGE,
      payload: url,
    });
  } catch (error) {}
};

export const setUserLocation = location => async dispatch => {
  try {
    dispatch({
      type: SET_USER_LOCATION,
      payload: location,
    });
  } catch (err) {}
};

export const setLogin = (email, password, callback) => async dispatch => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      auth().onAuthStateChanged(userData => {
        console.log(userData, 'FUCEK');
        if (userData) {
          const id = userData._user.uid;
          database()
            .ref(`/UsersList/${id}`)
            .once('value')
            .then(snapshot => {
              console.log('User data: lalaal ', snapshot.val());
              dispatch({
                type: SET_LOGIN,
                payload: snapshot.val(),
              });
            });
          callback(true);
          // dispatch({
          //   type: SET_LOGIN,
          //   payload: userData._user,
          // });
        }
      });
    })
    .catch(err => {
      console.log(err.code);
      callback(false);
      if (err.code === 'auth/wrong-password') {
        ToastAndroid.show('Wrong Password', ToastAndroid.SHORT);
      }
    });
};

export const setLogout = () => async dispatch => {
  try {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    dispatch({
      type: SET_LOGOUT,
    });
  } catch (error) {}
};

export const insertNewUser = data => async dispatch => {
  try {
    const data = await database()
      .ref('Users/')
      .push(data);
    dispatch({
      type: GET_USER_DATA,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
