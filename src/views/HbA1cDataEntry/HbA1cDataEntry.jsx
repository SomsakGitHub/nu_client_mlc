import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Kanit','Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class HbA1cDataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render(){
    return (
          <div>
          </div>
        );
  }
}

export default withStyles(styles)(HbA1cDataEntry);