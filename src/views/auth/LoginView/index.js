import React from 'react';
import * as Yup from 'yup';
import Section from './Section';
import { useFormik } from 'formik';
import LoginForm from './LoginForm';
import Page from '~/components/Page';
import Logo from '~/components/Logo';
import { Icon } from '@iconify/react';
import SocialLogin from './SocialLogin';
import { useSnackbar } from 'notistack';
import { PATH_PAGE } from '~/routes/paths';
import { useFirebase } from 'react-redux-firebase';
import closeFill from '@iconify-icons/eva/close-fill';
import { Link as RouterLink } from 'react-router-dom';
import useIsMountedRef from '~/hooks/useIsMountedRef';
import { otherError } from '~/utils/firebaseShowError';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Alert,
  Hidden,
  Divider,
  Container,
  Typography
} from '@material-ui/core';
import { MIconButton } from '~/@material-extend';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  header: {
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(7, 5, 0, 7)
    }
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  },
  divider: {
    margin: theme.spacing(3, 0)
  }
}));

// ----------------------------------------------------------------------

function LoginView() {
  const classes = useStyles();
  const firebase = useFirebase();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: 'demo@minimals.cc',
      password: 'demo1234',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await firebase.login({
          email: values.email,
          password: values.password
        });
        enqueueSnackbar('Login success', {
          variant: 'success',
          action: key => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: err.code });
        }
        if (otherError(err.code).error) {
          enqueueSnackbar(otherError(err.code).helperText, {
            variant: 'error'
          });
        }
      }
    }
  });

  return (
    <Page title="Minimal | Login" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Hidden smDown>
          <Box sx={{ mt: { md: -2 }, typography: 'body2' }}>
            Don’t have an account? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to={PATH_PAGE.auth.register}
            >
              Get started
            </Link>
          </Box>
        </Hidden>
      </header>

      <Hidden mdDown>
        <Section />
      </Hidden>

      <Container>
        <div className={classes.content}>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>
            <Typography color="textSecondary">
              Enter your details below.
            </Typography>
          </Box>

          <SocialLogin firebase={firebase} />

          <Divider className={classes.divider}>
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
          </Divider>

          <Box sx={{ mb: 5 }}>
            <Alert severity="info">
              Use email : <strong>demo@minimals.cc</strong> / password :
              <strong>&nbsp;demo1234</strong>
            </Alert>
          </Box>

          <LoginForm formik={formik} />

          <Hidden smUp>
            <Box sx={{ mt: 3, typography: 'body2', textAlign: 'center' }}>
              Don’t have an account?&nbsp;
              <Link
                variant="subtitle2"
                to={PATH_PAGE.auth.register}
                component={RouterLink}
              >
                Get started
              </Link>
            </Box>
          </Hidden>
        </div>
      </Container>
    </Page>
  );
}

export default LoginView;
