import React from "react";
import {Box, Container, Grid, styled } from "@mui/material";
import ButtonAppBar from "./ButtonAppBar";

const CustomBox = styled(Box)`
  padding: 20px;
` as typeof Box;

export default function layout(props: { children: JSX.Element }) {
    return (
        <Container disableGutters maxWidth="xl">
            <ButtonAppBar />
            <CustomBox>
                {props.children}
            </CustomBox>
        </Container>
    )
}