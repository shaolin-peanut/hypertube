// import React, { useState } from 'react';
// import { set, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { Input } from "./ui/input"
// import { Button } from "./ui/button"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"

// const AuthForm = () => {
//   const [step, setStep] = useState('email');
//   const [isNewUser, setIsNewUser] = useState(false);
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmitEmail = async (data) => {
//     try {
//       const response = await fetch(`http://localhost:3000/user/exists?email=${data.email}`);
//       const responseData = await response.json();
//       setIsNewUser(!responseData.exists);
//       setStep(responseData.exists ? 'login' : 'signup');
//       console.log(responseData.exists);
//     } catch (error) {
//       console.error('Error checking user:', error);
//     }
//   };

//   const onSubmitAuth = async (data) => {
//     // call /user/login or /user/create-user endpoint depending on data content
//     try {
//       if (data.first_name) {
//         console.log('were creating a new user');
//         const response = await fetch(`http://localhost:3000/user/create-user`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });
//         const responseData = await response.json();
//         if (responseData.success) {
//           navigate('/member/dashboard');
//         }
//       } else {
//         console.log('were loging in');
//         delete data.email;
//         const response = await fetch(`http://localhost:3000/user/login`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });
//         const responseData = await response.json();


//         console.log(responseData.success)
//         if (responseData.success) {
//           console.log("got here")
//           navigate('/member/dashboard');
//         }
//       }
//     } catch (error) {
//       console.error('Authentication error:');
//       //setErrors(error.message);
//     }
//   };

//   // le 'step' definis ce qui s'affiche ou non. le step 'email' affiche le champ email pour checker
//         // si l'user existe deja, le step 'login' affiche le champ password pour le login
//         // et le step 'signup' affiche les champs username, password, first_name, last_name pour le signup si l'user est nouveau
//   return (
//     <Card className="w-[350px] bg-black bg-opacity-100 backdrop-blur-md">
//       <CardHeader>
//         <CardTitle>{step === 'email' ? 'Welcome to Matcha' : (isNewUser ? 'Sign Up' : 'Log In')}</CardTitle>
//         <CardDescription>{step === 'email' ? 'Enter your email to get started' : (isNewUser ? 'Create your account' : 'Welcome back')}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit(step === 'email' ? onSubmitEmail : onSubmitAuth)}>
//           {step === 'email' && (
//             <Input
//               type="email"
//               placeholder="Email"
//               {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
//             />
//           )}
//           {step === 'login' && (
//             <>
//               <Input
//                 type="text"
//                 placeholder="Username"
//                 {...register('username', { required: 'Username is required' })}
//                 />
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
//               />
//             </>
//           )}
//           {step === 'signup' && (
//             <>
//               <Input
//                 type="text"
//                 placeholder="Username"
//                 {...register('username', { required: 'Username is required' })} 
//               />
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
//               />
//               <Input
//                 type="text"
//                 placeholder="First Name"
//                 {...register('first_name', { required: 'First Name is required' })}
//               />
//               <Input
//                 type="text"
//                 placeholder="Last Name"
//                 {...register('last_name', { required: 'Last Name is required' })}
//               />
//             </>
//           )}
//           <Button type="submit" className="w-full mt-4">
//             {step === 'email' ? 'Continue' : (isNewUser ? 'Sign Up' : 'Log In')}
//           </Button>
//         </form>
//       </CardContent>
//       {errors[Object.keys(errors)[0]] && (
//         <CardFooter>
//           <p className="text-red-500">{errors[Object.keys(errors)[0]].message}</p>
//         </CardFooter>
//       )}
//     </Card>
//   );
// };

// export default AuthForm;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitAuth = async (data) => {
    try {
      if (isLogin) {
        console.log('Logging in');
        const response = await fetch(`http://localhost:3000/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password
          }),
        });
        const responseData = await response.json();
        if (responseData.success) {
          navigate('/member/dashboard');
        }
      } else {
        console.log('Creating a new user');
        const response = await fetch(`http://localhost:3000/user/create-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        if (responseData.success) {
          navigate('/member/dashboard');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <Card className="w-[350px] bg-black bg-opacity-100 backdrop-blur-md">
      <CardHeader>
        <CardTitle>{isLogin ? 'Log In' : 'Sign Up'}</CardTitle>
        <CardDescription>{isLogin ? 'Welcome back' : 'Create your account'}</CardDescription>
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Click to Sign Up" : "Already have an account? Click to Log In"}
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitAuth)}>
          <Input
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />
          <Input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          />
          {!isLogin && (
            <>
              <Input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
              />
              <Input
                type="text"
                placeholder="First Name"
                {...register('first_name', { required: 'First Name is required' })}
              />
              <Input
                type="text"
                placeholder="Last Name"
                {...register('last_name', { required: 'Last Name is required' })}
              />
            </>
          )}
          <Button type="submit" className="w-full mt-4">
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      {errors[Object.keys(errors)[0]] && (
        <CardFooter>
          <p className="text-red-500">{errors[Object.keys(errors)[0]].message}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthForm;