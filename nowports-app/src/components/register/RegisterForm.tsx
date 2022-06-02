import * as React from 'react';
import { useNavigate } from 'react-router';
import { Alert, Box, Button, Link, styled, TextField } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { Send } from '@mui/icons-material';
import { RegisterInputs } from '../../types/Register';
import {EMAIL_NOT_VALID, fieldMessageRequired, trapSpacesForRequiredFields, VALIDATE_EMAIL_REGEX } from '../../utils/validations';

const InputDiv = styled('div')`
  margin-bottom: 8px;
`;

export default function RegisterForm(props: {
    onSubmit: (data: RegisterInputs) => void,
    loading: boolean
}) {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterInputs>();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <InputDiv>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: fieldMessageRequired("nombre")
                        },
                        validate: (value: string) => trapSpacesForRequiredFields(value),
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            label="Nombre"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.name && (
                    <Alert severity="error">
                        <span role="alert">{errors.name.message}</span>
                    </Alert>
                )}
            </InputDiv>
            <InputDiv>
                <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: {
                            value: true,
                            message: fieldMessageRequired("apellido")
                        },
                        validate: (value: string) => trapSpacesForRequiredFields(value),
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            label="Apellido"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.lastName && (
                    <Alert severity="error">
                        <span role="alert">{errors.lastName.message}</span>
                    </Alert>
                )}
            </InputDiv>
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
                            autoComplete="new-password"
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
                        navigate('/');
                    }}
                    underline="hover"
                >
                    Ya tienes cuenta?
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
                    Crear cuenta
                </Button>
            </Box>
        </form>
    );
}
