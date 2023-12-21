import { ClerkProvider } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import { setStore } from "./lib/apis/httpClient";
import { RouterConfigWrapper } from "./lib/configs/router-config";
import { APP_PATHS } from "./lib/configs/router-config/constants";
import { store } from "./store/store";

function App() {
  const navigate = useNavigate();
  setStore(store);
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider
      afterSignInUrl={APP_PATHS.Dashboard}
      afterSignUpUrl={APP_PATHS.AboutYourSelf}
      signInUrl={APP_PATHS.SignIn}
      signUpUrl={APP_PATHS.SignUp}
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <RouterConfigWrapper />
    </ClerkProvider>
  );
}

export default App;
