import * as React from 'react';
import { Alert, Box, Button, Divider, Grid, IconButton, styled, TextField, Typography } from '@mui/material';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {AddCircle, Delete, Send } from '@mui/icons-material';
import { ContactType } from '../../types/Contact';
import { fieldMessageRequired } from '../../utils/validations';
import { useAuth } from '../../auth/auth';

const InputDiv = styled('div')`
  margin-bottom: 8px;
`;

export default function ContactForm(props: {
    onSubmit: (data: ContactType) => void,
    loading: boolean
}) {
    const { user } = useAuth();
    const { control, reset, handleSubmit, formState: { errors } } = useForm<ContactType>({
        defaultValues: {
            addresses: [{ address: '' }],
            userId: user?.id
        },
    });
    const { fields, append, remove } = useFieldArray({
        name: "addresses",
        control
    });

    return (
        <form 
            onSubmit={handleSubmit((data: ContactType) => {
                props.onSubmit(data);
                reset();
            })}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <InputDiv>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: {
                                    value: true,
                                    message: fieldMessageRequired("nombre")
                                },
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
                        {errors.firstName && (
                            <Alert severity="error">
                                <span role="alert">{errors.firstName.message}</span>
                            </Alert>
                        )}
                    </InputDiv>
                </Grid>
                <Grid item xs={12} md={6}>
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
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputDiv>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: {
                                    value: true,
                                    message: fieldMessageRequired("teléfono")
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    variant="standard"
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.phone && (
                            <Alert severity="error">
                                <span role="alert">{errors.phone.message}</span>
                            </Alert>
                        )}
                    </InputDiv>
                </Grid>
            </Grid>
            <Divider style={{ margin: "20px 0" }} />
            <div style={{ display: "flex" }}>
                <Typography variant="h6" component="div">
                    Agregar dirección
                </Typography>
                <IconButton
                    onClick={() =>
                        append({
                            address: ""
                        })
                    }
                    aria-label="fingerprint" color="secondary"
                >
                    <AddCircle />
                </IconButton>
            </div>
            <Grid container spacing={2}>
                {fields.map((field, index) => {
                    return (
                        <Grid key={field.id} item xs={12} md={6}>
                            <InputDiv>
                                <div style={{ display: "flex" }}>
                                    <Controller
                                        name={`addresses.${index}.address` as const}
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: {
                                                value: true,
                                                message: fieldMessageRequired("nombre")
                                            },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth
                                                label={`Dirección ${index + 1}`}
                                                variant="standard"
                                                onChange={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {fields.length > 1 && (
                                        <IconButton onClick={() => remove(index)} aria-label="fingerprint" color="secondary">
                                            <Delete />
                                        </IconButton>
                                    )}
                                </div>
                                {errors?.addresses?.[index]?.address?.message && (
                                    <Alert severity="error">
                                        <span role="alert">{errors.addresses[index].address?.message}</span>
                                    </Alert>
                                )}
                            </InputDiv>
                        </Grid>
                    );
                })}
            </Grid>
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
                    Crear Contacto
                </Button>
            </Box>
        </form>
    );
}
