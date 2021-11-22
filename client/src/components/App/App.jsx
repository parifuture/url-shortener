import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";

import { URLTable } from "../URLTable";

const theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        {/* main content contaier */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* blank header */}
          <AppBar position="static"></AppBar>
          <Box
            component="main"
            sx={{ display: "flex", flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <h2>URL Shortner</h2>
              </Grid>
              <Grid item xs={12}>
                <Paper>
                  <URLTable />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
