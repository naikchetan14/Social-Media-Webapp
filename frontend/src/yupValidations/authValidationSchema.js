import * as Yup from "yup";
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .required("password is required")
    .max(20, "Maximum Password Length Should be 20"),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(10, "Minimum length of name must be 10")
    .max(20, "Maximum length of name must be 10"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .required("password is required")
    .max(10, "Maximum Password Length Should be 15"),

  // .test('fileSize', 'File too large', value => {
  //   return value && value.size <= 10000000; // 2 MB
  // })
  // .test('fileFormat', 'Unsupported Format', value => {
  //   return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
  // }),
});

export const postvalidationSchema = Yup.object().shape({
  caption: Yup.string()
    .required("Caption is Required")
    .min(10, "Minimum length of Caption must be 10")
    .max(30, "Maximum length of Caption must be 20"),
});
