import * as React from 'react';
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Layout from '../layout/Layout';
import {Alert, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { useGetContacts } from 'src/hooks/contact/useGetContacts';
import { ContactType } from '../../types/Contact';
import { Delete } from '@mui/icons-material';
import ConfirmDialog from '../ConfirmDialog';
import { useDeleteContact } from '../../hooks/contact/useDeleteContact';
import { useQueryClient } from 'react-query';
import { generateErrorMessage, GENERIC_ERROR } from 'src/utils/http-common';

interface Column {
    id: 'firstName' | 'lastName' | 'phone' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'firstName', label: 'Nombre', minWidth: 170 },
    { id: 'lastName', label: 'Apellido', minWidth: 170 },
    { id: 'phone', label: 'Teléfono', minWidth: 170 },
    { id: 'actions', label: '', minWidth: 20 },
];

export default function ContactList() {
    const queryClient = useQueryClient();
    const { data } = useGetContacts();
    const navigate = useNavigate();
    const { mutate } = useDeleteContact();
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
    const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
    const [idDelete, setIdDelete] = React.useState<number | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onDelete = (id: number) => {
        setOpenConfirm(true);
        setIdDelete(id);
    }

    const handleSave = () => {
        if (typeof idDelete === "number") {
            mutate(idDelete, {
                onSuccess: () => {
                    queryClient.setQueryData<{ data: ContactType[]} | undefined>(
                        "useGetContacts",
                        (prevDetailData) => {
                            if (prevDetailData?.data) {
                                return {
                                    ...prevDetailData,
                                    data: prevDetailData.data.filter(d => d.id !== idDelete)
                                }
                            } else {
                                return prevDetailData;
                            }
                        }
                    );
                },
                onError: (err) => {
                    setError(generateErrorMessage(err, GENERIC_ERROR))
                },
            });
            setIdDelete(null);
        }
        setOpenConfirm(false);
    }

    console.log(idDelete);

    return (
        <Layout>
            <Paper sx={{ width: '100%' }}>
                <ConfirmDialog
                    open={openConfirm}
                    handleClose={() => setOpenConfirm(false)}
                    handleSave={handleSave}
                    title="Eliminar contacto"
                    text="Seguro de eliminar el contacto?"
                />
                <Typography variant="h4" gutterBottom component="div">
                    Lista de contactos
                </Typography>
                <Button
                    style={{ margin: "10px 0" }}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/contact/create')}
                >
                    Agregar contacto
                </Button>
                {error && (
                    <Alert severity={"error"} style={{ marginBottom: "10px" }}>
                        <span role="alert">{error}</span>
                    </Alert>
                )}
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ top: 57, minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: ContactType, index: React.Key | null | undefined) => {
                                    return (
                                        <TableRow hover role="checkbox" key={index}>
                                            {columns.filter(c => c.id !== "actions").map((column) => {
                                                const value = column.id === "actions" ? "" : row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <Tooltip title="Eliminar contacto">
                                                    <IconButton onClick={() => onDelete(row.id)} aria-label="fingerprint" color="secondary">
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {data?.data?.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 25]}
                        component="div"
                        count={data?.data?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
        </Paper>
        </Layout>
    );
}