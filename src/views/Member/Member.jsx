import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Selectt from 'react-select';
import { Row, Col } from 'reactstrap';
// import { withStyless } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItemm from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
// @material-ui/core components***********************************************************************************
import withStyles from "@material-ui/core/styles/withStyles";
import TableHead from "@material-ui/core/TableHead";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { Icon } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
// core components*****************************************************************************************************
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ModalAddUser from "components/Modal/ModalAddUser.jsx";
import ModalDeleteUser from "components/Modal/ModalDeleteUser.jsx";
import ModalEditUser from "components/Modal/ModalEditUser.jsx";
import ModalInformationMember from "components/Modal/ModalInformationMember.jsx";
// utils**************************************************************************************************************
import { fetchUsers } from '../../utils/users';
import { fetchPartner } from '../../utils/partner';
import { PDFprints } from '../../utils/PDFprint';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  }
});

// class TablePaginationActions**********************************************************************************************
class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

// styles******************************************************************************************************************
const styles = theme => ({
  // root: {
  //   width: '100%',
  //   marginTop: theme.spacing.unit * 3,
  // },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Kanit', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    },
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
  },
  buttonSearch: {
    fontFamily: 'Kanit',
    marginTop: 15,
    marginLeft: 10,
    width: 120
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItemm
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItemm>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department_name: '',
      username: '',
      password: '',
      blood_glucose_member_id: '',
      blood_glucose_meter_qty: '',
      // hba1c_member_id: '',
      // hct_member_id: '',
      search_name: '',
      category_name: '',
      constSearch: false,
      partner: [],
      users: [],
      page: 0,
      rowsPerPage: 5,
      single: null,
      multi: null,
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // first work*************************************************************************************************************
  componentDidMount() {
    fetchUsers().then(data => {this.setState({ users: data });})
    fetchPartner().then(data => {this.setState({ partner: data });})
  }
  
  // searchFilter**************************************************************************************************************
  searchFilter(search_name, category_name) {
    console.log("search_name ",search_name.value);
    console.log("category_name ",category_name);
    // fetch(`http://localhost:3001/api/user/getSearch/${(search_name==="")?'search_name_null':search_name}/${(category_name==="")?'all':category_name}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ 
    //       users: data,
    //       constSearch: true 
    //     });
    //   });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleInputChange = search_name => value => {
    this.setState({
      [search_name]: value,
    });
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // clearSearch*************************************************************************************************************
  clearSearch(search_name, category_name) {
    if ((search_name!=="") || (category_name!=="")) {
      window.location.reload();
    } else if (this.state.constSearch===true) {
      window.location.reload();
    } else {
      return false
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { rowsPerPage, page } = this.state;

    const Partner = this.state.partner.map(suggestion => ({
      value: suggestion,
      label: suggestion,
    }));;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };
    
    let allUser = this.state.users.map(user => {
      return [[user.department_name],
      [(user.blood_glucose_member_id) ? user.blood_glucose_member_id : ""],
      [(user.blood_glucose_meter_qty) ? user.blood_glucose_meter_qty : ""],
      // [(user.hct_member_id) ? user.hct_member_id : ""],
      // [(user.hba1c_member_id) ? user.hba1c_member_id : ""],
      [(user.sentBgResult === true) ? <Icon style={{ color: "#00e676"}}>check_circle_outline</Icon> : <Icon style={{ color: "#ff1744"}}>highlight_off</Icon>],
      [<ModalInformationMember user={user} />],
      [<ModalEditUser user={user} />],
      [<ModalDeleteUser user={user} />]]
    })

    // let allUser = this.state.users.map(user => {
    //   return [[user.department_name],
    //   [(user.blood_glucose_member_id) ? "PT-Blood Glucose " + "(" + user.blood_glucose_member_id + ")" : "",
    //   (user.hct_member_id) ? "\nPT-Hct " + "(" + user.hct_member_id + ")" : "",
    //   (user.hba1c_member_id) ? "\nPT-HbA1c " + "(" + user.hba1c_member_id + ")" : ""],
    //   [user.username],
    //   [user.password],
    //   [<ModalEditUser user={user} />],
    //   [<ModalDeleteUser user={user} />]]
    // })

    return (
      
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
            <Row>
              <Col>
                <h4 className={styles.cardTitleWhite}>{allUser.length} หน่วยงาน </h4>
              </Col>
              <ModalAddUser/>
            </Row>
            </CardHeader>
            <CardBody >
              <GridContainer style={{ height: 100 }}>
                {/* <FormControl className={classes.formControl} style={{ marginLeft: 40 }}>
                  <InputLabel htmlFor="search_name" style={{ fontFamily: 'Kanit' }}  >Search (ค้นหา)</InputLabel>
                  <Input id="search_name" style={{ fontFamily: 'Kanit' }} value={this.state.search_name} onChange={this.handleInputChange('search_name')} />
                </FormControl> */}
                <NoSsr style={{ fontFamily: 'Kanit' }}>
                  <Selectt
                    classes={classes}
                    // styles={selectStyles}
                    options={Partner}
                    components={components}
                    value={this.state.search_name}
                    onChange={this.handleInputChange('search_name')}
                    placeholder="Search (ค้นหา)"
                  />
                  </NoSsr>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="category_name" style={{ fontFamily: 'Kanit' }}>
                    Category (หมวดหมู่)
                  </InputLabel>
                  <Select style={{ fontFamily: 'Kanit', width: 180 }}
                    value={this.state.category_name}
                    onChange={this.handleSelectChange}
                    displayEmpty
                    inputProps={{
                      name: 'category_name',
                      id: 'category_name',
                    }}
                  >
                    <MenuItem value="">
                      <em>ทั้งหมด</em>
                    </MenuItem>
                    <MenuItem value="blood_glucose_member_id">PT-Blood Glucose</MenuItem>
                    {/* <MenuItem value="hct_member_id">PT-Hct</MenuItem>
                    <MenuItem value="hba1c_member_id">PT-HbA1c</MenuItem> */}
                  </Select>
                </FormControl>
                <Button color="primary" className={classes.buttonSearch} variant="extendedFab" aria-label="Delete" onClick={() => this.searchFilter(this.state.search_name, this.state.category_name)}>
                  <Icon>search</Icon> ค้นหา
                </Button>
                <Button color="secondary" className={classes.buttonSearch} variant="extendedFab" aria-label="Delete" onClick={() => this.clearSearch(this.state.search_name, this.state.category_name)}>
                  ล้างการค้นหา
                </Button>
                <Button onClick={() => PDFprints()} variant="extendedFab" aria-label="Delete"
                  style={{ marginLeft: 'auto', marginRight: 10, fontFamily: 'Kanit', backgroundColor: "#5393ff", width: 150, marginTop: 10 }} >
                  PDF ดาวน์โหลด
                  <Icon style={{ marginLeft: 5 }} >cloud_download</Icon>
                </Button>

              </GridContainer>
              <Table style={{ fontFamily: 'Kanit' }}>
                <TableHead >
                  <TableRow >
                    {["Department name \n(ชื่อหน่วยงาน)", 
                      "Member id \n(รหัสผู้รับบริการ)",
                      "Meter quantity \n(จำนวนเครื่อง)" ,
                      // "รหัสผู้รับบริการ \nHct.", 
                      // "รหัสผู้รับบริการ \nHbA1c.",
                      "Result status \n(สถานะการส่งผล)", 
                      "Member information \n(ข้อมูลสมาชิก)",
                      "Edit \n(แก้ไข)", 
                      "Delete \n(ลบ)",].map((prop, key) => {
                      return (
                        <TableCell style={{ color: "#3d5afe", fontSize: "100%" }}
                          className={classes.tableCell + " " + classes.tableHeadCell}
                          key={key}
                        >
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody
                >
                  {allUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow key={row.id} className={classes.row}>
                        <TableCell component="th" scope="row" style={{ fontSize: "95%"}}>
                          {row[0]}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ fontSize: "95%" }}>
                          {row[1]}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ fontSize: "95%", textAlign: 'center' }}>
                          {row[2]}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ fontSize: "95%", textAlign: 'center' }}>
                          {row[3]}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ fontSize: "95%" }}>
                          {row[4]}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ fontSize: "95%" }}>
                          {row[5]}
                        </TableCell>
                        <TableCell component="th" scope="row" style={{ fontSize: "95%" }}>
                          {row[6]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={8}
                      count={allUser.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Member.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Member);