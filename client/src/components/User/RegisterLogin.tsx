import React, { useEffect, useRef, useState } from 'react';
import './RegisterLogin.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearErrors, loginUser, registerUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';

function RegisterLogin() {

    const registerTab = useRef<HTMLFormElement>(null);
    const loginTab = useRef<HTMLFormElement>(null);
    const toggleTab = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { message, loading, error } = useAppSelector(state => state.user);
    const { user, loading: userLoading } = useAppSelector(state => state.userDetails);
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupData, setSignupData] = useState<{ name: string, email: string, password: string, phone?: string }>({ name: "", email: "", password: "", phone: "" });
    const [avatar, setAvatar] = useState<string | undefined>("");
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>("");

    const switchTab = (type: string) => {
        if (type === "Login") {
            toggleTab.current?.classList.remove("switchToRight");
            registerTab.current?.classList.remove("switchToLeft");
            loginTab.current?.classList.remove("switchToRight");
        }
        else {
            toggleTab.current?.classList.add("switchToRight");
            registerTab.current?.classList.add("switchToLeft");
            loginTab.current?.classList.add("switchToRight");
        }
    }

    const submitLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = loginEmail.match("[^\s@]+@[^\s@]+\.[^\s@]+$") ? { email: loginEmail, password: loginPassword } : { phone: loginEmail, password: loginPassword };
        dispatch(loginUser(data));
    }

    const submitSignupForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { ...signupData, image: avatar };
        if (data.phone === "")
            delete data.phone;
        dispatch(registerUser(data));
    }

    const signupDataChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result?.toString());
                    setAvatar(reader.result?.toString());
                }
            };
            if (e.currentTarget.files)
                reader.readAsDataURL(e.currentTarget.files[0]);
        }
        else {
            setSignupData({ ...signupData, [e.currentTarget.name]: e.currentTarget.value })
        }
    }

    useEffect(() => {
        if (!userLoading) {
            if (Object.keys(user).length > 0) {
                navigate("/home");
            }
            else {
                if (error) {
                    toast.error(error);
                    dispatch(clearErrors());
                }
                if (message) {
                    toast.success(message);

                }
            }
        }
    }, [dispatch, error, message])

    return (
        loading ? <Loader /> :
            <>
                < div className='loginSignupContainer' >
                    <div className="loginSignupBox">
                        <div>
                            <div className="loginSignupToggle">
                                <div className="loginButton" onClick={() => { switchTab("Login") }}>Login</div>
                                <div className="signupButton" onClick={() => { switchTab("Signup") }}>Signup</div>
                            </div>
                            <div className="toggleBar toggleBarToRight" ref={toggleTab}></div>
                        </div>
                        <form className="loginForm" ref={loginTab} onSubmit={submitLoginForm}>
                            <div className="loginEmail">
                                <EmailOutlinedIcon />
                                <input type="text" placeholder="Phone or Email" required pattern="^\d{10}|[^\s@]+@[^\s@]+\.[^\s@]+$" title="Invalid email or phone" value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value) }} />
                            </div>
                            <div className="loginPassword">
                                <LockOpenOutlinedIcon />
                                <input type="password" placeholder="Password" required value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value) }} />
                            </div>
                            <Link to="/password/forgot" className='forgotPassword'>Forgot Password</Link>
                            <button className="loginSubmit" type='submit'>Login</button>
                        </form>

                        <form className="signupForm" encType='multipart/form-data' ref={registerTab} onSubmit={submitSignupForm}>
                            <div className="signupName">
                                <AccountCircleOutlinedIcon />
                                <input type="text" placeholder="Name" value={signupData.name} name="name" onChange={signupDataChange} />
                            </div>
                            <div className="signupEmail">
                                <EmailOutlinedIcon />
                                <input type="email" placeholder="Email" value={signupData.email} name="email" onChange={signupDataChange} />
                            </div>
                            <div className="signupPhone">
                                <PhoneOutlined />
                                <input type="tel" placeholder="Phone (optional)" value={signupData.phone} name="phone" onChange={signupDataChange} />
                            </div>
                            <div className="loginPassword">
                                <LockOpenOutlinedIcon />
                                <input type="password" placeholder="Password" value={signupData.password} name="password" onChange={signupDataChange} />
                            </div>
                            <div className="registerImage">
                                {avatarPreview ? <img src={avatarPreview} alt="Avatar Preview" /> : <span><FaUserCircle size="30px" /></span>}
                                <input type="file" accept="image/*" name="avatar" onChange={signupDataChange} />
                            </div>
                            <button className="signupSubmit" type='submit' >Signup</button>
                        </form>
                    </div>
                </div >
            </>
    )
}

export default RegisterLogin