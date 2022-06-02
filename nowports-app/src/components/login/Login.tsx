import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Alert, Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import LoginForm from './LoginForm';
import { LoginInputs } from '../../types/Login';
import { useAuth } from '../../auth/auth';

const CustomBox = styled(Box)`
  padding: 20px;
` as typeof Box;

type LocationState = {
    from: {
        pathname: string;
    }
}

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const { signin, error, localLoading } = useAuth();
    const from = (location.state as LocationState)?.from?.pathname || "/home";

    const onLoginSubmit = async (data: LoginInputs) => {
        await signin(data, () => {
            navigate(from, { replace: true });
        });
    };
    
    return (
        <Grid sx={{ flexGrow: 1 }} container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <Grid item>
                        {localLoading && (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        )}
                        <CustomBox
                            sx={{
                                width: '100%',
                                minWidth: 400,
                                maxWidth: 400,
                                boxShadow: theme.shadows,
                            }}
                        >
                            <Typography variant="h4" gutterBottom component="div">
                                Ingresar al sistema
                            </Typography>
                            {error && (
                                <Alert severity="error" style={{ marginBottom: "10px" }}>
                                    <span role="alert">{error}</span>
                                </Alert>
                            )}
                            <LoginForm loading={localLoading} onSubmit={onLoginSubmit} />
                        </CustomBox>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

