import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import { useAuthContext } from "../contexts/AuthContext";

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

const useSocialAuth = () => {
  const { socialLogin, setUser } = useAuthContext();
  const navigate = useNavigate();

  const loginWithProvider = async (loginType) => {
    try {
      const provider = providers[loginType];
      const userData = await signInWithPopup(firebaseAuth, provider);
      const email = userData.user.email || userData.user.providerData[0]?.email;
      const data = await socialLogin(email);

      if (data.status) {
        navigate("/");
      } else {
        navigate("/setusername");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { loginWithProvider };
};

export default useSocialAuth;
