import * as React from 'react';
import { useNavigate } from 'react-router';
import { Alert, Box, Button, Link, styled, TextField } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { Send } from '@mui/icons-material';
import { LoginInputs } from '../../types/Login';
import { EMAIL_NOT_VALID, fieldMessageRequired, VALIDATE_EMAIL_REGEX } from '../../utils/validations';

const InputDiv = styled('div')`
  margin-bottom: 8px;
`;

export default function LoginForm(props: {
    onSubmit: (data: LoginInputs) => void,
    loading: boolean
}) {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm<LoginInputs>();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <InputDiv>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: fieldMessageRequired("email")
                        },
                        pattern: {
                            value: VALIDATE_EMAIL_REGEX,
                            message: EMAIL_NOT_VALID
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            label="Email"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && (
                    <Alert severity="error">
                        <span role="alert">{errors.email.message}</span>
                    </Alert>
                )}
            </InputDiv>
            <InputDiv>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: fieldMessageRequired("contraseña")
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            type="password"
                            autoComplete="current-password"
                            fullWidth
                            label="Contraseña"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.password && (
                    <Alert severity="error">
                        <span role="alert">{errors.password.message}</span>
                    </Alert>
                )}
            </InputDiv>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{
                    marginTop: 2
                }}
            >
                <Link
                    component="button"
                    onClick={() => {
                        navigate('/register');
                    }}
                    underline="hover"
                >
                    Aún no tienes cuenta?
                </Link>
            </Box>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{
                    marginTop: 2
                }}
            >
                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<Send />}
                    disabled={props.loading}
                >
                    Send
                </Button>
            </Box>
        </form>
    );
}
