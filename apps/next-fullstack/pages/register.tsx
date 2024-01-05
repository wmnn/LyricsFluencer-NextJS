import React, { useState } from 'react';
import { auth } from '../src/util/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Input from '../components/Input';
import { onAuthStateChanged } from 'firebase/auth';

function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password == passwordAgain) {
            //Fetch wheather they subscribed to the newsletter
            await fetch('/payment/mailerlite?email=' + email, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == 200) {
                        //Create an account if the user subscribed to the newsletter
                        createUserWithEmailAndPassword(
                            auth,
                            email,
                            password
                        ).then((userCredential) => {
                            createUserInDb();
                        });
                    }
                });
        }
    };
    const createUserInDb = async () => {
        var token;
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                //@ts-ignore
                token = user.accessToken;
                fetching(token);
            } else {
                console.log('Not logged in');
                return;
            }
        });
    };
    const fetching = async (token) => {
        var res = await fetch('/payment/free?token=' + token, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        });
        res = await res.json();
        if (res.status == 200) {
            router.push('/onboarding/appstore');
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center text-xl">
            <div className="flex flex-col mt-[-10%] w-[80%] md:w-[40%]">
                <div className="flex justify-end"></div>
                <div className="bg-gray-200 w-[100%] rounded-xl shadow-2xl flex justify-center">
                    <form
                        /*onSubmit={handleSignUp} */ className="flex flex-col w-[80%] my-8"
                    >
                        <label className="flex flex-col justify-between">
                            <p>Email:</p>
                            <Input
                                handleChange={(e) => setEmail(e.target.value)}
                                type={'email'}
                                value={email}
                            />
                            {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 rounded-xl p-2"/> */}
                        </label>

                        <label className="flex flex-col justify-between my-2">
                            Password:
                            <Input
                                handleChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                type={'password'}
                                value={password}
                            />
                        </label>
                        <label className="flex flex-col justify-between my-2">
                            Repeat Password:
                            <Input
                                handleChange={(e) =>
                                    setPasswordAgain(e.target.value)
                                }
                                type={'password'}
                                value={passwordAgain}
                            />
                        </label>

                        <div className="mb-4" />

                        <Button
                            text={'Create Account'}
                            color={'bg-black'}
                            handleClick={() => handleSignUp(event)}
                        />

                        <div className="flex justify-center mt-4">
                            <span className="inline-flex">
                                Already have an account?{' '}
                                <p
                                    className="pl-2 hover:cursor-pointer"
                                    onClick={() => {
                                        router.push('/login');
                                    }}
                                >
                                    Login
                                </p>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
