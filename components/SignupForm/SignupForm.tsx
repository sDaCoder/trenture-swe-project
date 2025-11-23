"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface SignupInputs {
    name: string;
    email: string;
    password: string;
}

const SignupForm = () => {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<SignupInputs>();

    const [isLoading, setIsLoading] = useState(false);

    const signupFormSubmit: SubmitHandler<SignupInputs> = async (signupData: SignupInputs) => {
        setIsLoading(true);
        try {
            const res = await axios.post("/api/users/signup", signupData);
            console.log(res.data)
            toast.success(res.data.message)
            console.log("Form errors:", errors)
            reset()
            router.push("/login")
        } catch (error: any) {
            toast.error(error?.response?.data?.error)
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Card className="w-full max-w-sm bg-transparent backdrop-blur-xl">
                <CardHeader>
                    <CardTitle>Signup to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(signupFormSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    {...register("name")}
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit">
                                    {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    {isLoading ? "Signing up..." : "Sign Up"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <Link href="/login">Log In</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default SignupForm