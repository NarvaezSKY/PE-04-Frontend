"use client"
import { title } from "@/components/primitives"
import DefaultLayout from "@/layouts/default"
import { Card, Input, Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react"
import { TbEyeFilled as EyeFilledIcon } from "react-icons/tb";
import { FaEyeSlash as EyeSlashFilledIcon, FaRegCopy } from "react-icons/fa";
import { MdOutlineAlternateEmail as MailIcon } from "react-icons/md";
import { useState } from "react"
import { useLogin } from "@/hooks/useLogin"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { handleLogin, isLoading, authError } = useLogin()
    const [isVisible, setIsVisible] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>()

    const toggleVisibility = () => setIsVisible(!isVisible)

    const onSubmit = (data: LoginFormInputs) => {
        handleLogin(data)
    }

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <Card className="w-full max-w-md p-8 shadow-lg">
                    <div className="flex flex-col gap-6">
                        <div className="text-center">
                            <h1 className={title()}>Iniciar sesión</h1>
                            <p className="mt-2 text-sm text-default-500">Inicia sesión para actualizar el reporte PE-04.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <Input
                                type="email"
                                label="Correo electrónico"
                                placeholder="tu@ejemplo.com"
                                {...register("email", { required: "El correo es obligatorio" })}
                                endContent={<MailIcon size={25} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                variant="bordered"
                                isRequired
                                classNames={{
                                    input: "text-sm",
                                    inputWrapper: "h-12",
                                }}
                                isInvalid={!!errors.email}
                                errorMessage={errors.email?.message}
                            />

                            <Input
                                label="Contraseña"
                                placeholder="Ingresa tu contraseña"
                                {...register("password", { required: "La contraseña es obligatoria" })}
                                variant="bordered"
                                isRequired
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                classNames={{
                                    input: "text-sm",
                                    inputWrapper: "h-12",
                                }}
                                isInvalid={!!errors.password}
                                errorMessage={errors.password?.message}
                            />

                            <Button
                                type="submit"
                                color="success"
                                size="lg"
                                className="w-full font-medium"
                                isDisabled={isLoading}
                                isLoading={isLoading}
                            >
                                Iniciar sesión
                            </Button>
                            {authError && (
                                <span className="text-red-500 text-sm text-center">{authError}</span>
                            )}
                        </form>

                        <div className="text-center">
                            <p className="text-sm text-default-500">
                                ¿No tienes una cuenta?
                            </p>
                            <Popover className="text-success font-medium">
                                <PopoverTrigger>
                                    <Button variant="light" className="text-default-500 font-semibold">Contacta al administrador</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64">
                                    <p className="text-sm text-default-500">
                                        Contacta al administrador para crear una cuenta.
                                        <br />
                                        <span className="text-primary" id="admin-email">cnarvaezq@sena.edu.co</span>
                                        <Button
                                            variant="light"
                                            size="sm"
                                            className="ml-1"
                                            isIconOnly
                                            color="primary"
                                            onClick={() => {
                                                navigator.clipboard.writeText("cnarvaezq@sena.edu.co");
                                                toast.success("Correo copiado al portapapeles");
                                            }}
                                        >
                                            <FaRegCopy className="text-lg" />
                                        </Button>
                                    </p>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </Card>
            </section>
        </DefaultLayout>
    )
}
