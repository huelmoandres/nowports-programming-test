import * as React from 'react';
import { useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TemporaryDrawer from './TemporaryDrawer';
import { useAuth } from '../../auth/auth';

export default function ButtonAppBar() {
    const navigate = useNavigate();
    const { user, signout } = useAuth();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <TemporaryDrawer />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {`${user?.name} ${user?.lastName}`}
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => signout(() => navigate("/"))}
                    >
                        Salir
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
