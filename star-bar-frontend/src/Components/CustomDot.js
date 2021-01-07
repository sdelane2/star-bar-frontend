import { Dot } from "pure-react-carousel";
import PropTypes from "prop-types";
import React from "react";
import { Button, Container } from "semantic-ui-react";

const CustomDot = ({ slides, size }, props) => (
    <Container textAlign="center">
    

        <Button  as={Dot}  icon="circle" slide={0} onClick={props.yesterdayCl}  />
        <Button  as={Dot}  icon="circle" slide={1} />
        <Button  as={Dot}  icon="circle" slide={2} />
      )
  
    </Container>
);
CustomDot.defaultProps = {
    size: "mini"
  };
  
  CustomDot.propTypes = {
    slides: PropTypes.number.isRequired,
    size: PropTypes.string
  };




export default CustomDot;

