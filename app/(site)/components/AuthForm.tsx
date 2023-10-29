"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type AuthVariant = "LOGIN" | "REGISTER";

export const AuthForm = () => {
    const [variant, setVariant] = useState<AuthVariant>("LOGIN");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const toggleVariant = useCallback(() => {
        variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN");
    }, [variant]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: { email: "", password: "", name: "" },
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === "REGISTER") {
            // Axios register
        }
        if (variant === "LOGIN") {
            // Next auth signin
        }
    };
    const socialAction = (action: string) => {
        setIsLoading(true);
        // Next auth social signin
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-fill sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form
                    className="space-y-6 mb-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* handleSubmit wrapper fn need to get data in onSubmit props */}
                    {variant === "REGISTER" && (
                        <Input
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id="email"
                        label="Email adress"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button type="submit" disabled={isLoading} fulllWidth>
                            {/* do not need onClick because btn in form  */}
                            {variant === "LOGIN" ? "Sign in" : "Register"}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-3" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction("github")}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction("google")}
                        />
                    </div>
                    <div className="flex justify-center gap-2 mt-6 px-2 text-sm text-gray-500">
                        <div>
                            {variant === "LOGIN"
                                ? "New to Messenger?"
                                : "Already have an account?"}
                        </div>
                        <div
                            onClick={toggleVariant}
                            className="text-blue-500 hover:text-blue-600 focus:outline-none cursor-pointer"
                        >
                            {variant === "LOGIN" ? "Register" : "Sign in"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
