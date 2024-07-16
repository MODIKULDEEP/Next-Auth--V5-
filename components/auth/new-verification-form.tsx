"use client"

import {CardWrapper} from "@/components/auth/card-wrapper";
import {HashLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {newVerification} from "@/actions/new-verification";
import {FormSuccess} from "@/components/form-success";
import {FormError} from "@/components/form-error";

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing Token!");
            return
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data?.success);
                setError(data?.error)
            })
            .catch(() => {
                setError("Something went wrong!");
            })
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit]);

    return (
        <CardWrapper
            headderLabel="Confirming your verification, please wait..."
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="w-full flex items-center justify-center">
                {!success && !error &&
                    <HashLoader/>
                }
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
        </CardWrapper>
    )
}

export default NewVerificationForm;