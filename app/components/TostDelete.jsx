import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TostDelete = ({open}) => {


  return (
    <div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Note archived"
        >
          <Alert severity="error">{"تم الحذف بنجاح"}</Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default TostDelete;