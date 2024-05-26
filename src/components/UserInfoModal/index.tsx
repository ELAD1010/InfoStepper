import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useForm } from "react-hook-form";

import "./index.css";
import InfoStepper from "../InfoStepper";
import CustomForm from "../CustomForm";
import React from "react";
import InfoReview from "../InfoReview";

type Inputs = {
  firstName: string;
  lastName: string;
  age: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<Props, typeof UserInfoModal>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  handleClose: () => void;
};

const UserInfoModal = ({ open, handleClose }: Props) => {
  const { register, watch, reset } = useForm<Inputs>();

  const { firstName, lastName, age } = watch();

  const submitForm = () => {
    console.log(watch());
    handleClose();
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("age", age);
    reset({ age: "", firstName: "", lastName: "" });
  };

  const steps = [
    {
      title: "Names",
      element: (
        <CustomForm
          fields={[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
          ]}
          register={register}
        />
      ),
    },

    {
      title: "Age",
      element: (
        <CustomForm
          fields={[{ label: "Age", name: "age" }]}
          register={register}
        />
      ),
    },
    { title: "Information Review", element: <InfoReview info={watch()} /> },
  ];

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Sign Up Form</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please fill in your private information
          </DialogContentText>
          <div className="stepper">
            <InfoStepper
              watch={watch}
              steps={steps}
              handleSubmit={() => submitForm()}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserInfoModal;
