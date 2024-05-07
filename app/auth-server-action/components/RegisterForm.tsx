import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../components/ui/form";


import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
// import { cn } from "@/lib/utils";
import { cn } from "../../lib/utils"
import { useTransition } from "react";
import { signUpWithEmail } from "../action";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FormSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(3, {
			message: "Password is required.",
		}),
		confirm: z.string().min(3, {
			message: "Password is required.",
		}),
	})
	.refine((data) => data.confirm === data.password, {
		message: "Password did not match",
		path: ["confirm"],
	});
export default function RegisterForm() {
	const [isPending , startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
			confirm: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () => {
			try {
				const result = await signUpWithEmail(data);
				const { error } = JSON.parse(result);
				
				if(error){
					toast.error("Email Already in Use");
				}
				else{
					toast.success("You are SignUp!");
				}
				
			} catch (error) {
				console.error('Error during sign up:', error);
				// Display a toast notification for unexpected errors
				toast.error('An unexpected error occurred.');
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
				<FormField
					control={form.control}
					name="confirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									className="text-black"
									placeholder="Confirm Password"
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
					Register
					<AiOutlineLoading3Quarters className={cn("animate-spin", {"hidden" : !isPending})} />
				</Button>
			</form>
		</Form>
	);
}
