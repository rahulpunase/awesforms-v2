import { SignIn } from "@clerk/clerk-react";
const SignInView = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default SignInView;
