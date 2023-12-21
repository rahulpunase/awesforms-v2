export const getRequiredObject = (value: boolean) => ({
  value,
  message: "This is a required field",
});

export const getMinLengthObject = (value: number) => ({
  value,
  message: `Minimum ${value} characters are required`,
});

export const getMaxLengthObject = (value: number) => ({
  value,
  message: `Only ${value} characters are allowed`,
});
