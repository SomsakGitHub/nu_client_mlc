import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import dataEntryStyle from "assets/jss/material-dashboard-react/components/dataEntryStyle.jsx";

function Danger({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.dangerText}>
      {children}
    </div>
  );
}

Danger.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dataEntryStyle)(Danger);
