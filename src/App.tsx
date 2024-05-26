import { useState } from "react";
import Button from "@mui/material/Button";

import "./App.css";

import "./components/UserInfoModal";
import UserInfoModal from "./components/UserInfoModal";

function App() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="layout">
        <Button variant="contained" onClick={handleOpen}>
          Open Modal
        </Button>
        <UserInfoModal open={open} handleClose={handleClose} />
      </div>
    </>
  );
}

export default App;
