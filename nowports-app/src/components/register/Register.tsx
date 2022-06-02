import * as React from 'react';
import { useNavigate } from 'react-router';
import Grid from '@mui/material/Grid';
import { Alert, Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import RegisterForm from './RegisterForm';
import { RegisterInputs } from '../../types/Register';
import { useRegister } from '../../hooks/register/useRegister';
import { useAuth } from '../../auth/auth';
import { generateErrorMessage, GENERIC_ERROR } from '../../utils/http-common';

const CustomBox = styled(Box)`
  padding: 20px;
` as typeof Box;

export default function Register() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { mutate, isLoading } = useRegister();
    const { signin } = useAuth();
    const [error, setError] = React.useState<string | null>(null);
    
    const onRegisterSubmit = (data: RegisterInputs) => {
        mutate(data, {
            onSuccess: () => {
                signin({ email: data.email, password: data.password }, () => {
                    navigate("/home");
                })
            },
            onError: (err) => {
                setError(generateErrorMessage(err, GENERIC_ERROR));
            },
        });
    };
    
    return (
        <Grid sx={{ flexGrow: 1 }} container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <Grid item>
                        {isLoading && (
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
                            {error && (
                                <Alert severity="error" style={{ marginBottom: "10px" }}>
                                    <span role="alert">{error}</span>
                                </Alert>
                            )}
                            <Typography variant="h4" gutterBottom component="div">
                                Crear una cuenta nueva
                            </Typography>
                            <RegisterForm loading={isLoading} onSubmit={onRegisterSubmit} />
                        </CustomBox>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

