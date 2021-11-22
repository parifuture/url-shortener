import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";

import { createNewCode } from "../../api/codes";

export const FormDialog = ({ isOpen, handleClose }) => {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  // on submit make post call to apiend point and if success close the dialog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    let response;
    try {
      response = await createNewCode(url);
    } catch (err) {
      handleClose();
      return;
    }
    if (response) {
      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <Dialog
      open={isOpen}
      maxWidth={"sm"}
      fullWidth={true}
      onClose={() => handleClose()}
    >
      <DialogTitle>Shorten URL</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="Enter the URL:"
          type="url"
          autoComplete="off"
          fullWidth
          variant="standard"
          onInput={(e) => setUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleSubmit}>
          Shorten
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};
