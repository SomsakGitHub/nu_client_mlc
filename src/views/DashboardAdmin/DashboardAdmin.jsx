import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Update from "@material-ui/icons/Update";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from '@material-ui/core/Button';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// utils***************************************************************************************************************
import { fetchUsers } from '../../utils/users';
import { exportCsv } from '../../utils/allResult';

import socketIOClient from 'socket.io-client'

class DashboardAdmin extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        open: false,
        value: 0,
        users: [],
        column: "column",
        endpoint: "http://localhost:3002" // เชื่อมต่อไปยัง url ของ realtime server
      };
}

  componentDidMount() {
    fetchUsers().then(data => {this.setState({ users: data });})
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  
  render() {
 
    const { classes } = this.props;

    let totalBloodGlucoseMemberID = this.state.users.filter(user => {
      return user.blood_glucose_member_id !== ""
    })

    const socket = socketIOClient("http://localhost:4000")

    socket.on('newMessage', (data) => {
      this.setState({ open: true });           
    })

    // let totalHctMemberID = this.state.users.filter(user => {
    //   return user.hct_member_id !== ""
    // })

    // let totalHbA1cMemberID = this.state.users.filter(user => {
    //   return user.hba1c_member_id !== ""
    // })

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
          <Button onClick={this.handleClick}>Open simple snackbar</Button>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>people</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>จำนวนผู้ใช้งานในระบบ</p>
                <h3 className={classes.cardTitle}>
                  {this.state.users.length} <small>หน่วยงาน</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Current information (ข้อมูล ณ ปัจจุบัน)
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>colorize</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>ผู้ใช้งาน PT-Blood Glucose</p>
                <h3 className={classes.cardTitle}>
                  {totalBloodGlucoseMemberID.length} <small>หน่วยงาน</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Current information (ข้อมูล ณ ปัจจุบัน)
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          {/* <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>sentiment_satisfied_alt</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>ผู้ใช้งาน PT-Hct</p>
                <h3 className={classes.cardTitle}>
                  {totalHctMemberID.length} <small>หน่วยงาน</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  ช้อมูล ณ ปัจจุบัน
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>sentiment_satisfied_alt</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>ผู้ใช้งาน PT-HbA1c</p>
                <h3 className={classes.cardTitle}>
                  {totalHbA1cMemberID.length} <small>หน่วยงาน</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  ช้อมูล ณ ปัจจุบัน
                </div>
              </CardFooter>
            </Card>
          </GridItem> */}
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>colorize</Icon>
                </CardIcon>
                <Button onClick={()=> exportCsv()} variant="extendedFab" aria-label="Delete"
                  style={{ fontFamily: 'Kanit', backgroundColor: "#00e676", width: 150, marginTop: 10 }} >
                  Excel ดาวน์โหลด
                  <Icon style={{ marginLeft: 5 }} >cloud_download</Icon>
                </Button>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  all result (รวบรวมผล)
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      
    );
  }
}

DashboardAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DashboardAdmin);
