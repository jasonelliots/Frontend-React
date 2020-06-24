import React from "react";
import Div from "../stylingComponents/Div";
import H2 from "../stylingComponents/H2";
import NavStyling from "../stylingComponents/NavStyling";
import ATags from "../stylingComponents/ATags";

export default function Nav() {
    return (
    <Div class="navigation">
        <H2>WunderList</H2>
        <NavStyling>
            <ATags href="#home">Home</ATags>
            <ATags href="#about">About Us</ATags>
            <ATags href="#contact">Contact</ATags>
        </NavStyling>
    </Div>
    )
}