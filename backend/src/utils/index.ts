export const notAvailableValidate = (
  body: Record<string, any>,
  propertiesToValidated: string[]
): string => {
  const notAvailable: string[] = [];
  propertiesToValidated.forEach((property) => {
    if (!body[property]) {
      notAvailable.push(property);
    }
  });
  return notAvailable.join(", ");
};

export const validateEmail = (email: string) =>
  new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email.trim());

export const validateMinimumLength = (
  strToValidate: string,
  minLength: number
) => strToValidate.trim().length > minLength;
