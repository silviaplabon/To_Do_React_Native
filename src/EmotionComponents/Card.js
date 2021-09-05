import React from "react"
import styled, { css } from "@emotion/native"

const Card = props => (
    <CardContainer bgColor={props.bgColor} height={props.height} direction={props.direction}>{props.children}</CardContainer>
)

export default Card;

const CardContainer = styled.View`
  flex:1;
  display:flex;
  flex-direction:${props => props.direction};;
  width: 90%;
  height:${props => props.height};
  background-color:${props => props.bgColor};
  justify-content:space-between;
  shadow-color: black;
  shadow-offset: 10px;
  shadow-radius: 6px;
  shadow-opacity: 0.20;
  elevation: 8;
  margin-top:5px;
  border-radius: 10px;
  margin-left: 5%;
  margin-bottom: 3px;
  margin-right: 5%;
`


