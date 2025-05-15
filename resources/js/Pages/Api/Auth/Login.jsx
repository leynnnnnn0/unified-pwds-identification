import { useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Logo from "../../../../images/mainLogo.jpg";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("api.login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-blue-50 to-white">
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Logo" className="h-16 w-auto" />
                </div>

                <h2 className="text-2xl font-poppins font-bold text-center text-black mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="font-montserrat text-gray-700"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-20"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="font-montserrat text-gray-700"
                            />
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-black hover:text-secondary-color transition-colors font-montserrat"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-20"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="rounded border-gray-300 text-black focus:ring-black"
                            />
                            <span className="ms-2 text-sm text-gray-600 font-montserrat">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors font-poppins"
                        >
                            {processing ? "Processing..." : "Sign In"}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 font-montserrat">
                            Don't have an account?{" "}
                            <Link
                                href="/api/register"
                                className="font-medium text-secondary-color hover:text-orange-600 transition-colors"
                            >
                                Register now
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500 font-montserrat">
                &copy; {new Date().getFullYear()} UPID. All rights reserved.
            </div>
        </div>
    );
}
