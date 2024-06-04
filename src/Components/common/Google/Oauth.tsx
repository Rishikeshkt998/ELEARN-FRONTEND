
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Button } from "flowbite-react";
import { app } from "../../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../store/slice/authSlice";




const Oauth = () => {
    const auth = getAuth(app);
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            console.log(resultFromGoogle)

            const response = await axios.post("http://localhost:5000/api/user/google", {
                name: resultFromGoogle.user.displayName,
                email: resultFromGoogle.user.email,
                googlePhotoUrl: resultFromGoogle.user.photoURL
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            console.log(response.data);
            if (response.data.success) {
                dispatch(setCredentials(response.data.token));
                localStorage.setItem('userId', response.data.userData._id);
                toast.success('user signed in successfully')
                navigate(`/home`);
            } else {
                toast.error('an error while signin')
                navigate('/')
            }


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Button type="button" className="block w-full max-w-xs  rounded-lg  ms-9 font-semibold" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
                <AiFillGoogleCircle className="w-6 h-6 mr-2" />
                Sign in with Google
            </Button>
        </div>
    );
};

export default Oauth;


