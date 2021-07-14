import { Avatar, Button, Container, makeStyles, TextField, Typography } from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons"
import { useRouter } from "next/router";
import { FormEvent, useCallback, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

export default function Login() {
  const usernameInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const classes = useStyles();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        await signIn({
          username: usernameInputRef.current.value,
          password: passwordInputRef.current.value,
        });
        router.push('/');
      } catch (error) {
        addToast({ message: "crendenciais inválidas", type: 'error' });
      }
    },
    [usernameInputRef, passwordInputRef],
  )

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            inputRef={usernameInputRef}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            inputRef={passwordInputRef}
            variant="outlined"
            margin="normal"
            required
            fullWidth
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
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));