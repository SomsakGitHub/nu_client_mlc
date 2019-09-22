import React from "react";
import PropTypes from "prop-types";
import { Label} from 'reactstrap';
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { getFromStorage} from '../../utils/storage';
import { fetchUserById } from '../../utils/userById';

class DashboardUser extends React.Component {
  state = {
    user: []
  };

  componentDidMount() {
    const dataId = getFromStorage('the_main_app')._id;
    fetchUserById(dataId).then(data => {this.setState({ user: data });})
  }

  render() {
    const { classes } = this.props;
    const user = this.state.user;

    return ( <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={5}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>ข้อมูลผู้รับบริการ</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Label style={{color: "#3d5afe"}}>User id (รหัสผู้ใช้) : </Label>
                <Label style={{color: "#212121" }}>{user.username}</Label>
                <br/>
                <Label style={{color: "#3d5afe"}}>Id blood glucose (รหัส blood glucose) : </Label>
                <Label style={{color: "#212121" }}>{user.blood_glucose_member_id}</Label>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>ประชาสัมพันธ์</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Label style={{color: "#3d5afe"}}>ประชาสัมพันธ์ </Label>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={5}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Status</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Label style={{color: "#3d5afe"}}>Closing date</Label>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Dowload</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Label style={{color: "#3d5afe"}}>Dowload</Label>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    );
  }
}

DashboardUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DashboardUser);
