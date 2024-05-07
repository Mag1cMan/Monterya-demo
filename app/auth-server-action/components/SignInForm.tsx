import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils"
import { useTransition } from "react";
import { Peddana } from "next/font/google";
import { signInWithEmail } from "../action";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { redirect } from "next/navigation";


const FormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, {
		message: "Password is required.",
	}),
});

export default function SignInForm() {

	const [isPending , startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {

		startTransition( async()=>{

			const result = await signInWithEmail(data);
			const { error } = JSON.parse(result);
			console.log(error);
			if(error){
				toast.error("Invalid Credentials");
			}
			else{
				toast.success("You are logged in!");
				redirect("/");
			}

		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="example@gmail.com"
									{...field}
									type="email"
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="password"
									{...field}
									type="password"
									onChange={field.onChange}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full flex gap-2 bg-black hover:text-white-300 hover:text-white hover:bg-blue-500 transition-all duration-200">
					SignIn
					<AiOutlineLoading3Quarters className={cn("animate-spin", {"hidden": !isPending})} />
				</Button>
			</form>
		</Form>
	);
}
