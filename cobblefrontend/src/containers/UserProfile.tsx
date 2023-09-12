import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface closeModalProps {
  closeModal: () => void;
}
const UserProfile: React.FC<closeModalProps> = ({ closeModal }) => {
  // const [userDetail, setUserDetail] = useState()

  const dispatch = useDispatch();

  const { data } = useSelector((state: any) => state.users.user);

  useEffect(() => {
    closeModal();
    dispatch({ type: "GET_USER_BY_ID" });
  }, []);

  return <div>{data && <p>{data.firstName}</p>}</div>;
};

export default UserProfile;
