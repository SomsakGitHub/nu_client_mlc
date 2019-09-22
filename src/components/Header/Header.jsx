import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import { Icon } from '@material-ui/core';
// core components
import HeaderLinks from "./HeaderLinks";
import Button from "components/CustomButtons/Button";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";

//storage---------------------------------------------------------------------------------------------------------
import { getFromStorage} from '../../utils/storage';

function Header({ ...props }) {
  // function makeBrand() {
  //   var name;
  //   props.routes.map((prop, key) => {
  //     if (prop.path === props.location.pathname) {
  //       name = prop.navbarName;
  //     }
  //     return null;
  //   });
  //   return name;
  // }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });

  const data = getFromStorage('the_main_app');

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          {/* <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button> */}
          {
            (data.department_name === "Admin") ? 
              (
                <Button style={{ fontFamily: 'Kanit', paddingLeft: 10, left: 20}}>
                <Icon style={{ marginRight: 10}}>account_circle</Icon>
                {data.department_name}
                </Button>
              ) 
            : (
                <Button style={{ fontFamily: 'Kanit', paddingLeft: 10, left: 20}}>
                <Icon style={{ marginRight: 10}} >account_balance</Icon>
                {data.department_name}
                </Button>
              )
          }
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
