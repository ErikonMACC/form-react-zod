import { zodResolver } from "@hookform/resolvers/zod"
import { Title } from './Title'
import { useForm } from "react-hook-form"
import { z } from "zod"
import "../assets/styles/Forms.css"

import { Button } from "./ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

const createFormSchema = z.object({
    email: z
        .string()
        .email("O e-mail deve ser example@example.com")
        .min(1, "E-mail é obrigatório"),
    password: z.string().min(8, {
        message: "A senha deve ter pelo menos 8 caracteres.",
    }),
    image: z.any()
        .refine((file) => file instanceof File, "Imagem é obrigatória.")
})

export function Forms() {

    const form = useForm<z.infer<typeof createFormSchema>>({
        resolver: zodResolver(createFormSchema)
    })
    function handleCreateValues(values: z.infer<typeof createFormSchema>) {
        alert("Seus valores foram enviados ( Veja o console )")
        console.log(values)
    }

    return (
        <>
            <div className="forms-box container-fluid">
                <Title />
                <div className="row">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreateValues)} className="space-y-8 col-8 offset-1" container-fluid>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu e-mail" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Aqui você digitará seu e-mail
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Digite sua senha" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Aqui você digitará sua senha
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imagem</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    field.onChange(e.target.files?.[0]);
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Aqui você enviará uma imagem
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="button-box">
                                <Button className="button-submit pl-12 pr-12 text-xl" type="submit">Enviar</Button>
                            </div>
                        </form>
                    </Form >
                </div>
            </div>
        </>
    )
}