import database from '@react-native-firebase/database';
import {GET_USER_DATA} from './types';
export const getSingleData = () => async dispatch => {
  try {
    const data = await database()
      .ref('UsersList/-M5VglMpoECkkBq9J8v6')
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());
      });
    dispatch({
      type: GET_USER_DATA,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
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
