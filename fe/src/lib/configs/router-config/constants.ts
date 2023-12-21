export const APP_NAMES = {
  SignIn: "sign-in",
  SignUp: "sign-up",
  AboutYourSelf: "about-your-self",
  Dashboard: "dashboard",
  SharedForm: "shared-form",
  Builder: "builder",
};
export const APP_PATHS: Record<keyof typeof APP_NAMES, string> = {
  SignIn: `/${APP_NAMES.SignIn}`,
  SignUp: `/${APP_NAMES.SignUp}`,
  AboutYourSelf: `/${APP_NAMES.AboutYourSelf}`,
  Dashboard: `/${APP_NAMES.Dashboard}`,
  SharedForm: `/${APP_NAMES.Dashboard}/${APP_NAMES.SharedForm}`,
  Builder: `/${APP_NAMES.Builder}`,
};
