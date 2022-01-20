import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { formValidations } from "./validation";

export interface IFormProps {
  duration_months: number;
  amount: number;
  upfrontPayment: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  email: string;
  agreementCheck: boolean;
}
export const useFormHandler = () => {
  return useForm<IFormProps>({
    defaultValues: {
      duration_months: 12,
      amount: 5,
      upfrontPayment: "No",
      cardNumber: "",
      expirationDate: "",
      securityCode: "",
      email: "",
      agreementCheck: false,
    },
    resolver: yupResolver(formValidations),
  });
};
