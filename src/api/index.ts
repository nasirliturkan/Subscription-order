export interface ISubscriptionPlanData {
  duration_months: number;
  price_usd_per_gb: number;
}

export interface ISubscriptionPlan {
  subscription_plans: ISubscriptionPlanData[];
}

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

export const OrderProcessServices = {
  fetchData: async (): Promise<ISubscriptionPlan> => {
    const api = "https://run.mocky.io/v3/7bd73285-e105-457c-a0e7-265fc96da154";
    try {
      console.log(await fetch(api).then((res) => res.json()));
      return await fetch(api).then((res) => res.json());
    } catch (error: any) {
      return error.message;
    }
  },
/*  submitProcess: async (): Promise<IFormProps> => {
    return axios.post<ISubscribePlanRq, any>("https://httpbin.org/post", data);
  },*/
};
