 import { setItem, storeData} from "./asyncStorage";

 export const setProfileImage = async (ProfilePix) => {
    await setItem("profileImage", ProfilePix);
  };

