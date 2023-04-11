import { useEffect, useState } from "react";
import firebase from "../../../../utils/firebase";

const useReceiverDisplayName = (receiverUid) => {
  const [receiverDisplayName, setReceiverDisplayName] = useState("");

  useEffect(() => {
    const fetchReceiverDisplayName = async () => {
      const userRef = firebase.firestore().collection("users").doc(receiverUid);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        setReceiverDisplayName(userDoc.data().username);
      }
    };

    fetchReceiverDisplayName();
  }, [receiverUid]);

  return receiverDisplayName;
};

export default useReceiverDisplayName;
