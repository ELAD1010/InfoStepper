import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import { StepData } from "./types/step.type";
import { FieldValues, UseFormWatch } from "react-hook-form";
import { FormField } from "../CustomForm";

type Props<T extends FieldValues> = {
  steps: StepData[];
  handleSubmit: () => void;
  watch: UseFormWatch<T>;
};

const InfoStepper = <TFieldValues extends FieldValues>({
  steps,
  handleSubmit,
  watch,
}: Props<TFieldValues>) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFormValid, setFormValid] = useState(false);

  const handleNext = () => {
    if (activeStep == steps.length - 1) {
      setActiveStep(0);
      handleSubmit();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      const currentformValid = steps[activeStep].element.props.fields?.every(
        (field: FormField<TFieldValues>) => value[field.name].length > 0
      );

      if (isFormValid != currentformValid) {
        setFormValid(currentformValid);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, activeStep, steps, isFormValid]);

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map(({ title }) => {
          return (
            <Step key={title}>
              <StepLabel>{title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <>
        {steps[activeStep].element}
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

          <Button disabled={!isFormValid} onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </>
    </div>
  );
};

export default InfoStepper;
