import React, { useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  AppBar,
  Toolbar,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@mui/styles";

import { CardDetailsForm } from "./Forms/CardDetailsForm";
import { ConfirmationForm } from "./Forms/ConfirmationForm";
import { ProcessDetailsForm } from "./Forms/ProcessDetailsForm";

import { IFormProps, useFormHandler } from "./useFormHandler";

interface IProps {}

const useStyles = makeStyles((theme: any) => ({
  topAppBar: {
    Height: "10vh",
    minHeight: "100px",
  },
  boxWrapper: {
    marginBottom: "55px",
    minHeight: "calc(26vh + 400px)",
  },
  container: {
    position: "relative",
    zIndex: "1100",
    marginTop: "-95px",
    marginBottom: "45px",
  },
  topLayout: {
    margin: "4rem 0",
  },
  paperLayout: {
    padding: "2rem",
    marginTop: "10rem",
    margin: "auto",
    border: "1px solid #ebedf0",
    borderRadius: "4px",
  },
  stepper: {
    height: "calc(10vh - 40px)",
    minHeight: "55px",
  },
  notification: {
    padding: "15px 11px",
  },
}));

export const SubscriptionOrderProcess: React.FunctionComponent<IProps> = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState<IFormProps>({} as IFormProps);
  const form = useFormHandler();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = form;

  const steps = [
    "Select subscription parameters",
    "Payment data",
    "Confirmation",
  ];

  const handleStepContent = (step: any) => {
    switch (step) {
      case 0:
        return <ProcessDetailsForm />;
      case 1:
        return <CardDetailsForm />;
      case 2:
        return <ConfirmationForm />;
      default:
        return <></>;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      fetch("https://httpbin.org/post", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...register("duration_months") }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
      return;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const classes = useStyles();

  return (
    <Box component="main" className={classes.boxWrapper}>
      <Container maxWidth="md" className={classes.container}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.topLayout}
        >
          <Paper className={classes.paperLayout}>
            <Grid container>
              <Grid item md={12} xs={12}>
                <AppBar
                  position="static"
                  elevation={0}
                  color="default"
                  className={classes.topAppBar}
                >
                  <Toolbar>
                    <Grid
                      container
                      item
                      direction="row"
                      alignItems="center"
                      xs={12}
                      sm={6}
                    >
                      <Grid item marginTop={3} marginLeft={20}>
                        <Typography variant="h4" noWrap color="primary">
                          SUBSCRIPTION FORM
                        </Typography>
                      </Grid>
                    </Grid>
                  </Toolbar>
                </AppBar>
              </Grid>
              <Grid item md={12} xs={12}>
                <Box m={2}>
                  <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      return (
                        <Step key={index} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </Box>
              </Grid>
              <Grid item md={12} xs={12}>
                {handleStepContent(activeStep)}
              </Grid>
              <Grid>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography className={classes.notification}>
                      All steps completed
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
};
