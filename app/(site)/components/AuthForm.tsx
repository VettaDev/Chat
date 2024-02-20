"use client";

import { Button } from "@/app/components/Buttons/Button";
import { Input } from "@/app/components/Input";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingModal from "@/app/conversations/[conversationId]/components/LoadingModal";

type AuthVariant = "LOGIN" | "REGISTER";

export const AuthForm = () => {
    const session = useSession();
    const router = useRouter();

    const [variant, setVariant] = useState<AuthVariant>("LOGIN");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/users");
        }
    }, [session?.status, router]);

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
            axios
                .post("/api/register", data)
                .then(() => signIn("credentials", data))
                .catch((err) => {
                    toast.error("Something went wrong");
                })
                .finally(() => setIsLoading(false));
        }
        if (variant === "LOGIN") {
            signIn("credentials", {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error("Invalid credentials");
                    }
                    if (callback?.ok) {
                        toast.success("Success!");
                        router.push("/users");
                    }
                })
                .finally(() => setIsLoading(false));
        }
    };
    const socialAction = (action: string) => {
        setIsLoading(true);
        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid credentials");
                }
                if (callback?.ok) {
                    toast.success("Success!");
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            {isLoading && <LoadingModal />}
            <div className="mt-8 sm:mx-auto sm:w-fill sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg w-[300px] sm:px-10 sm:w-[400px]">
                    <form
                        className="space-y-6 mb-6 "
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

                        <Button type="submit" disabled={isLoading} fulllWidth>
                            {/* do not need onClick because btn in form  */}
                            {variant === "LOGIN" ? "Sign in" : "Register"}
                        </Button>
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
        </>
    );
};
