
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}

export const storeData = async (value, key) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
}


export const setItem = async (key, value) => {
  try {
   const item =  await AsyncStorage.setItem(key, value)
   
   return item
  } catch(e) {
    // save error
  }
  console.log('Done.')
}

export const getItem = async (key) => {
  try {
  const item =   await AsyncStorage.getItem(key)
  return item
  } catch(e) {
    // read error
  }

  console.log('Done.')

}

export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
  }

  console.log('Done.')
}