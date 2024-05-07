import { Button } from "../../components/ui/button";
import React, { useTransition } from "react";
import { UserAuth } from "../../context/AuthContext";

//import { cn } from "@/lib/utils";
import { cn } from "../../lib/utils"

export default function OAuthForm() {
	const [isPending , startTransition] = useTransition();
	const { user, googleSignIn, logOut, authReady } = UserAuth();

	// Change this to the server component

	const delay = (ms : any) => new Promise(resolve => setTimeout(resolve, ms));

    const handleLoginWithGoogle = async () => {
        startTransition(async () => {
			await delay(1000);
			await googleSignIn();
			// toast({
			// 		title: "You submitted the following values:",
			// 		description: (
			// 			<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
			// 				<code className="text-white">
			// 					Login With Google
			// 				</code>
			// 			</pre>
			// 		),
			// });
        });
    }


	// <AiOutlineLoading3Quarters className={cn("animate-spin", {"hidden" : !isPending})} />


	return (
<>

		{isPending ? (
			<Button type="button" className="w-full bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center" disabled>
			  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
				<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
				<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.287-1.336-8.485-3.515z"></path>
			  </svg>
			  Processing...
			</Button>
		  ) : (
			 
			<Button className="w-full px-4 bg-black text-white py-2 rounded-lg mb-6 hover:text-white-300 hover:text-white hover:bg-red-500 transition-all duration-200" onClick={handleLoginWithGoogle} >
			  <img src="/google.png" alt="Google Icon" className="w-6 h-6 inline mr-2" />
			  Sign In with Google
			</Button>
		  )}
</>
				
	)
}
