import React from "react"
import styled, { css } from "@emotion/native"

const Container = props => {
    return(
        <ContainerArea >{props.children}</ContainerArea>

    ) 
}
export default Container;

const ContainerArea = styled.View`
background: #fff;
height: 100%;
width: 100%;
display:flex;
flex:1;
justify-content:center;
align-items:center;
`