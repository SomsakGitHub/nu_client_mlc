import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import dataEntryStyle from "assets/jss/material-dashboard-react/components/dataEntryStyle.jsx";

function Info({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.infoText}>
      {children}
    </div>
  );
}

Info.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dataEntryStyle)(Info);
