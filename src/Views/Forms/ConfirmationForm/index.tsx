import React from "react";
import {
  Box,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import { useFormHandler } from "../../useFormHandler";

export const ConfirmationForm: React.FunctionComponent = () => {
  const form = useFormHandler();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  return (
    <form>
      <Grid container>
        <Grid item md={4} xs={12}>
          <Box m={3}>
            <Typography variant="subtitle2" gutterBottom component="div">
              Total price : 20 USD
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
              Price per GB : 3 USD
            </Typography>
          </Box>
        </Grid>
        <Grid item md={8} xs={12}>
          <Box m={2}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Email"
                  variant="outlined"
                  required
                  fullWidth
                  {...register("email")}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <p>{errors.email?.message}</p>
          </Box>
        </Grid>
      </Grid>
      <Grid item md={8} xs={12}>
        <Box m={2}>
          <Controller
            name="agreementCheck"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                name="Agreement"
                control={
                  <Checkbox
                    {...register("agreementCheck")}
                    value={value}
                    onChange={onChange}
                  />
                }
                label="I agree to the Terms & Conditions and Privacy Policy"
              />
            )}
          />
          <p>{errors.agreementCheck?.message}</p>
        </Box>
      </Grid>
    </form>
  );
};
