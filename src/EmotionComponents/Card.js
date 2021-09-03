import React from "react"
import styled, { css } from "@emotion/native"

const Card = props => (
    <CardContainer></CardContainer>
)

export default Card;

const CardContainer = styled.View`
    flex: 1,
    width: '90%',
    height:10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.20,
    elevation: 8,
    borderRadius: 10,
    margin: 1,
    color:${props=>props.textColor}
    flexDirection:  ${props => props.flexDirection}||'row'
    border-radius: 10px;    
    background-color: ${props => props.backgroundColor};
`

