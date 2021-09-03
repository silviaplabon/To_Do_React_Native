import React from "react"
import styled, { css } from "@emotion/native"

const DescriptionTag = props => (
    props.text ?   <Description>{props.text}</Description>:  <Description>Value</Description>
)

export default DescriptionTag;


const Description = styled.Text`
    font-size:12px;
	font-weight: 400;
	color: black;
	text-align: center;
`