import * as yup from "yup";

export const formValidations = yup.object().shape({
  durationMonths: yup.number().required("Required."),
  amount: yup.number().required("Required."),
  upfrontPayment: yup.string().required("Required."),

  cardNumber: yup.string().required("Required."),
  expirationDate: yup.string().required("Required."),
  securityCode: yup.string().required("Required."),

  email: yup.string().required("Required."),
  agreement: yup.boolean().required("Required."),
});
