import React, { useContext } from 'react';
import { AuthProvider } from '../../Provider/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const { signIn } = useContext(AuthProvider)

    const handleSignIn = (e) => {
        e.preventDefault()

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(data => {
                navigate('/')
            })
            .catch(error => {
                toast("Username or Password not Currect")
            })
    };


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className='text-center text-2xl font-semibold'>Admin Login</h1>
                            <hr />
                            <form onSubmit={handleSignIn}>
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className="input" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password" name='password' className="input" placeholder="Password" />
                                    <input type="submit" className='btn' value="Login" />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;