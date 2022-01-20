import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

import { useFormHandler } from "../../useFormHandler";

const useStyles = makeStyles((theme: any) => ({
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

export const CardDetailsForm: React.FunctionComponent = () => {
  const form = useFormHandler();

  const {
    control,
    formState: { errors },
    register,
  } = form;

  const classes = useStyles();

  return (
    <form>
      <Grid container spacing={3} direction="row" className={classes.container}>
        <Grid>
          <Controller
            name="cardNumber"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputMask
                mask="9999 9999 9999 9999"
                {...register("cardNumber")}
                value={value}
                onChange={onChange}
              >
                {() => (
                  <TextField
                    id="cardNumber"
                    label="Card Number"
                    variant="outlined"
                  />
                )}
              </InputMask>
            )}
          />
          <p>{errors.cardNumber?.message}</p>
        </Grid>
        <Grid>
          <Controller
            name="expirationDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputMask
                mask="99/9999"
                {...register("expirationDate")}
                value={value}
                onChange={onChange}
              >
                {() => (
                  <TextField
                    id="expirationDate"
                    label="Expiration Date"
                    variant="outlined"
                  />
                )}
              </InputMask>
            )}
          />
          <p>{errors.expirationDate?.message}</p>
        </Grid>
        <Grid>
          <Controller
            name="securityCode"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputMask
                mask="999"
                {...register("securityCode")}
                value={value}
                onChange={onChange}
              >
                {() => (
                  <TextField
                    id="securityCode"
                    label="Security Code"
                    variant="outlined"
                  />
                )}
              </InputMask>
            )}
          />
          <p>{errors.securityCode?.message}</p>
        </Grid>
      </Grid>
    </form>
  );
};
