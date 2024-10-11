import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: () => <div>Hello /register!</div>,
});

// import { Button } from "~/components/ui/button";
// import { Checkbox } from "~/components/ui/checkbox";
// import { Input } from "~/components/ui/input";
// import { Label } from "~/components/ui/label";
// import { Facebook, Twitter } from "lucide-react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "~/components/ui/form";

// export default function Component() {
//   return (
//     <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Join the world's largest community of book lovers on Goodreads
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" action="#" method="POST">
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <Label htmlFor="name" className="sr-only">
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 className="rounded-t-md"
//                 placeholder="Name"
//               />
//             </div>
//             <div>
//               <Label htmlFor="email-address" className="sr-only">
//                 Email address
//               </Label>
//               <Input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 placeholder="Email address"
//               />
//             </div>
//             <div>
//               <Label htmlFor="password" className="sr-only">
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 placeholder="Password"
//               />
//             </div>
//             <div>
//               <Label htmlFor="password-confirm" className="sr-only">
//                 Confirm password
//               </Label>
//               <Input
//                 id="password-confirm"
//                 name="password-confirm"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className="rounded-b-md"
//                 placeholder="Confirm password"
//               />
//             </div>
//           </div>

//           <div className="flex items-center">
//             <Checkbox id="terms" required />
//             <Label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
//               I'm not affiliated with Goodreads by any means.
//             </Label>
//           </div>

//           <div>
//             <Button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#382110] hover:bg-[#58371F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#382110]"
//             >
//               Sign up
//             </Button>
//           </div>
//         </form>

//         <div className="mt-6">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-[#F9F7F4] text-gray-500">
//                 Or sign up with
//               </span>
//             </div>
//           </div>

//           <div className="mt-6 grid grid-cols-2 gap-3">
//             <Button
//               variant="outline"
//               className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//             >
//               <Facebook className="h-5 w-5 text-[#3B5998] mr-2" />
//               Facebook
//             </Button>

//             <Button
//               variant="outline"
//               className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//             >
//               <Twitter className="h-5 w-5 text-[#1DA1F2] mr-2" />
//               Twitter
//             </Button>
//           </div>
//         </div>

//         <p className="mt-2 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <a
//             href="#"
//             className="font-medium text-[#382110] hover:text-[#58371F]"
//           >
//             Sign in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
