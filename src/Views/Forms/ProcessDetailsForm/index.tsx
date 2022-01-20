import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { TextField, MenuItem, Grid } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { ISubscriptionPlan, OrderProcessServices } from "../../../api";

import { useFormHandler } from "../../useFormHandler";

const useStyles = makeStyles(() => ({
  container: {
    height: "20vh",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20px",
  },
  errorMessage: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "0.2rem",
  },
}));

export const ProcessDetailsForm: React.FunctionComponent = () => {
  const [data, setData] = useState<ISubscriptionPlan>();
  const form = useFormHandler();
  const onSubmit = (data: any, e: any) => console.log(data, e);
  const onError = (errors: any, e: any) => console.log(errors, e);
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = form;

  useEffect(() => {
    OrderProcessServices.fetchData().then((value) => setData(value));
  }, []);

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Grid container spacing={3} className={classes.container}>
        <Grid item md={4}>
          <Controller
            name="duration_months"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                fullWidth
                label="Duration Month"
                variant="outlined"
                {...register("duration_months", { required: true })}
                value={value}
                onChange={onChange}
              >
                {data?.subscription_plans.map((month, index) => (
                  <MenuItem value={month.duration_months} key={index}>
                    {month.duration_months}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <p>{errors.duration_months?.message}</p>
        </Grid>
        <Grid item md={4}>
          <Controller
            name="amount"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                fullWidth
                label="Amount"
                variant="outlined"
                {...register("amount")}
                value={value}
                onChange={onChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </TextField>
            )}
          />
          <p>{errors.amount?.message}</p>
        </Grid>
        <Grid item md={4}>
          <Controller
            name="upfrontPayment"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                fullWidth
                variant="outlined"
                label="Upfront Payment"
                {...register("upfrontPayment")}
                value={value}
                onChange={onChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            )}
          />
          <p>{errors.upfrontPayment?.message}</p>
        </Grid>
      </Grid>
    </form>
  );
};
