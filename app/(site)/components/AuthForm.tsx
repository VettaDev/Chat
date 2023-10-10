"use client";

import { Input } from "@/app/components/Input";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
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
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Input />
                </form>
            </div>
        </div>
    );
};
