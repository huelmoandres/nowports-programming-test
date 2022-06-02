import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import ContactForm from './ContactForm';
import Layout from '../layout/Layout';
import { ContactType } from '../../types/Contact';
import { useContactCreate } from '../../hooks/contact/useContactCreate';
import { generateErrorMessage, GENERIC_ERROR } from '../../utils/http-common';
import { useQueryClient } from 'react-query';

const CustomBox = styled(Box)`
  padding: 20px;
` as typeof Box;

export default function Contact() {
    const queryClient = useQueryClient();
    const theme = useTheme();
    const { mutate, isLoading } = useContactCreate();
    const [message, setMessage] = React.useState<{
        msg: string;
        type: "error" | "success"
    } | null>(null);

    const onContactSave = async (data: ContactType) => {
        mutate(data, {
            onSuccess: () => {
                setMessage({ msg: "Contacto creado correctamente.", type: "success" });
                queryClient.invalidateQueries("useGetContacts");
            },
            onError: (err) => {
                setMessage({ msg: generateErrorMessage(err, GENERIC_ERROR), type: "error" })
            },
        });
    };
    
    return (
        <Layout>
            <Grid item xs={12}>
                {isLoading && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )}
                <CustomBox
                    sx={{
                        boxShadow: theme.shadows,
                    }}
                >
                    {message && (
                        <Alert severity={message.type} style={{ marginBottom: "10px" }}>
                            <span role="alert">{message.msg}</span>
                        </Alert>
                    )}
                    <Typography variant="h4" gutterBottom component="div">
                        Ingresar contacto
                    </Typography>
                    <ContactForm loading={isLoading} onSubmit={onContactSave} />
                </CustomBox>
            </Grid>
        </Layout>
    );
}

