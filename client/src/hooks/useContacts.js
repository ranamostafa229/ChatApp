import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { allUsersRoute } from "../utils/ApiRoutes";

const useContacts = (currentUser) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!currentUser || !currentUser.isAvatarImageSet) {
      setContacts([]);
      return;
    }

    const getContacts = async () => {
      const { data } = await apiClient.get(
        `${allUsersRoute}/${currentUser._id}`,
      );
      setContacts(data);
    };

    getContacts();
  }, [currentUser]);

  return contacts;
};

export default useContacts;
