import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import authenticationController from "../../controllers/authentication.controller";
import { IAuthentication } from "../../store/slices/authenticationSlice";
import CircularProgress from '@mui/material/CircularProgress';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Ab-properties
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignIn: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const authenticationState = useSelector<RootState, IAuthentication>(
    (state) => state.authentication
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authenticationController(email, password));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="border-2 border-white rounded-md p-5 shadow-lg"
        >
          <Avatar sx={{ m: 1, background: 'transparent' }}>
            <img src="./adaptive-icon.png" />
          </Avatar>
          <Typography component={"h1"} variant="h5">
            Ab - Properties
          </Typography>
          {/* <Typography component="h1" variant="h5">
            Sign In
          </Typography> */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={[{ mt: 3, mb: 2, background: "#FFB34D" }, { '&:hover': { backgroundColor: '#FFB34E'}}]}
            >
              {authenticationState.isLoading ?
                <CircularProgress size={23} color="inherit" />
                : "Sign in"
              }
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
