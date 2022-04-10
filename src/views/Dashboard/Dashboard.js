import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import MailIcon from '@material-ui/icons/Mail';
import { BsFillPersonCheckFill } from 'react-icons/bs'
import PeopleIcon from '@material-ui/icons/People';
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { HiOutlineLogin } from 'react-icons/hi'
import { HiOutlineLogout } from 'react-icons/hi'
import { BsCheckSquare } from 'react-icons/bs'
import { FiMinusSquare } from 'react-icons/fi'
import { bugs, website, server } from "variables/general.js";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { fetchDashboards, fetchAllCategoryPeriodAmount } from "./Dashboard.service";
import { MSG_TYPE } from "components/Snackbar/AlertToaster";
import { useToaster } from "components/Snackbar/AlertToaster";
import { TableHeader } from "views/MemberList/MemberList.styles";
import { Column } from "views/MemberList/MemberList.styles";
import { TableContainer } from "views/MemberList/MemberList.styles";
import { TableRow } from "views/MemberList/MemberList.styles";
import InStatusList from "./InStatusList";
import OutStatusList from "./OutStatusList";
import PaidStatusList from "./PaidStatusList";
import DueStatusList from "./DueStatusList";

const feeStructureHeaderColumns = [
  {
    id: 1,
    align: "left",
    label: "Category",
    width: "30%",
  },
  {
    id: 2,
    align: "center",
    label: "Peroid",
    width: "30%",
  },
  {
    id: 3,
    align: "left",
    label: "Amount",
    width: "30%",
  },
];

const useStyles = makeStyles(styles);

export default function Dashboard(props) {

  const { history } = props;

  const classes = useStyles();
  const toaster = useToaster();
  const [dashboards, setDashboards] = useState({
    memberInfo: {},
    memberTxns: {},
    memberDetails: {},
  });


  const dateFunc = (value) => {
    var date = value;
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = yyyy + '-' + mm + '-' + dd;
    return date;
  }

  Date.prototype.GetFirstDayOfWeek = function () {
    return (new Date(this.setDate(this.getDate() - this.getDay())));
  }

  Date.prototype.GetLastDayOfWeek = function () {
    return (new Date(this.setDate(this.getDate() - this.getDay() + 6)));
  }

  const monthJoinFunc = (data) => {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = dateFunc(new Date(y, m, 1));
    var lastDay = dateFunc(new Date(y, m + 1, 0));

    var resultProductData = data.filter(a => {
      var dateVal = dateFunc(new Date(a.joinDate));
      return (dateVal >= firstDay && dateVal <= lastDay);
    });

    return resultProductData.length;
  };

  const todayAmountFunc = (data) => {
    const todayAmt = data.filter((val) => dateFunc(new Date(val.setCurrentDateTime)) == dateFunc(new Date()));
    const todayAmtSum = todayAmt.length ? todayAmt.reduce((accumulator, current) => accumulator + current.amount, 0) : 0;
    return todayAmtSum;
  }

  const thisWeekAmountFunc = (data) => {
    var curr = new Date; 
    var first = curr.getDate() - curr.getDay(); 
    var last = first + 6;

    const sunAmt = data.filter((val) => dateFunc(new Date(new Date(curr.setDate(first)))) == dateFunc(new Date(val.setCurrentDateTime)));
    const monAmt = data.filter((val) => dateFunc(new Date(new Date(curr.setDate(first + 1)))) == dateFunc(new Date(val.setCurrentDateTime)));
    const tueAmt = data.filter((val) => dateFunc(new Date(new Date(curr.setDate(first + 2)))) == dateFunc(new Date(val.setCurrentDateTime)));
    const wedAmt = data.filter((val) => dateFunc(new Date(new Date(curr.setDate(first + 3)))) == dateFunc(new Date(val.setCurrentDateTime)));
    const thuAmt = data.filter((val) => dateFunc(new Date(new Date(curr.setDate(first + 4)))) == dateFunc(new Date(val.setCurrentDateTime)));
    const friAmt = data.filter((val) => dateFunc(new Date(new Date(curr.setDate(first + 5)))) == dateFunc(new Date(val.setCurrentDateTime)));
    const satAmt = data.filter((val) => dateFunc(new Date(new Date(curr.setDate(last)))) == dateFunc(new Date(val.setCurrentDateTime)));
   
    return [sunAmt.length ? sunAmt.reduce((accumulator, current) => accumulator + current.amount, 0) : 0, monAmt.length ? monAmt.reduce((accumulator, current) => accumulator + current.amount, 0) : 0, tueAmt.length ? tueAmt.reduce((accumulator, current) => accumulator + current.amount, 0) : 0, wedAmt.length ? wedAmt.reduce((accumulator, current) => accumulator + current.amount, 0) : 0, thuAmt.length ? thuAmt.reduce((accumulator, current) => accumulator + current.amount, 0) : 0, friAmt.length ? friAmt.reduce((accumulator, current) => accumulator + current.amount, 0) : 0, satAmt.length ? satAmt.reduce((accumulator, current) => accumulator + current.amount, 0) : 0];
  }

  const getDashboards = async () => {
    try {
      const { data } = await fetchDashboards();
      const { data: FeeStructureData } = await fetchAllCategoryPeriodAmount();
      
      let memberTransactionData = [];
      data.forEach((val) => {
        if(val.member_transactions.length) memberTransactionData.push(...val.member_transactions);
      })

      const todayAmount = todayAmountFunc(memberTransactionData);
      const thisWeekAmount = thisWeekAmountFunc(memberTransactionData);

      const totalMembers = data.length;
      const todayJoin = data.filter((val) => dateFunc(new Date(val.joinDate)) == dateFunc(new Date())).length;
      const monthJoin = monthJoinFunc(data);
      const signinMembers = data.filter((val) => val.isSignup == 1).length;
      const inMembers = data.filter((val) => val.isAvailable == 1).length;
      const paidMembers = data.filter((val) => val.feeStatus == 1).length;
      const inList = data.filter((val) => val.isAvailable == 1);
      const outList = data.filter((val) => val.isAvailable == 0);
      const PaidList = data.filter((val) => val.feeStatus == 1);
      const dueList = data.filter((val) => val.feeStatus == 0);
      const feeStructure = FeeStructureData;

      const dashboardObj = {
        totalMembers,
        todayJoin,
        monthJoin,
        signinMembers,
        inMembers,
        paidMembers,
        inList,
        outList,
        PaidList,
        dueList,
        feeStructure
      };

      setDashboards(dashboardObj);
    } catch (err) {
      toaster(MSG_TYPE.WARNING, err);
    }
  }

  useEffect(() => {
    getDashboards();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PeopleIcon />
              </CardIcon>
              <p className={classes.cardCategoryWhite}>Members</p>
              <small className={classes.cardTitle}>
                {`Today Joined: ${dashboards?.todayJoin}`}
              </small>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats} style={{marginRight: "120px"}}>
                {`Monthly: ${dashboards?.monthJoin}`}
              </div>
              <div className={classes.stats}>
                {`Total: ${dashboards?.totalMembers}`}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <BsFillPersonCheckFill />
              </CardIcon>
              <p className={classes.cardCategoryWhite}>Signed in</p>
              <h3 className={classes.cardTitle}>{dashboards?.signinMembers}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              {`Total: ${dashboards?.totalMembers}`}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <CheckCircleIcon />
              </CardIcon>
              <p className={classes.cardCategoryWhite}>In Status</p>
              <h3 className={classes.cardTitle}>{dashboards?.inMembers}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              {`Total: ${dashboards?.totalMembers}`}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <MailIcon />
              </CardIcon>
              <p className={classes.cardCategoryWhite}>Paid Status</p>
              <h3 className={classes.cardTitle}>{dashboards?.paidMembers}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              {`Total: ${dashboards?.totalMembers}`}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Members:"
            headerColor="primary"
            tabs={[
              {
                tabName: "IN",
                tabIcon: HiOutlineLogin,
                tabContent: (
                  <InStatusList list={dashboards.inList}/>
                ),
              },
              {
                tabName: "OUT",
                tabIcon: HiOutlineLogout,
                tabContent: (
                  <OutStatusList list={dashboards.outList}/>
                ),
              },
              {
                tabName: "PAID",
                tabIcon: BsCheckSquare,
                tabContent: (
                  <PaidStatusList list={dashboards.PaidList}/>
                ),
              },
              {
                tabName: "DUE",
                tabIcon: FiMinusSquare,
                tabContent: (
                  <DueStatusList list={dashboards.dueList}/>
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Fee Structure</h4>
            </CardHeader>
            <CardBody>
              <TableHeader>
                {feeStructureHeaderColumns.map(column => (
                  <Column
                    key={column.id}
                    size={column.width}
                    alignTo={column.align}
                  >
                    {column.label}
                  </Column>
                ))}
              </TableHeader>
              <TableContainer staticHeight={'55vh'}>
              {dashboards?.feeStructure?.map(row => (
                <TableRow>
                  <Column size={"30%"} alignTo="left">
                    {row?.category?.name}
                  </Column>
                  <Column size={"30%"} alignTo="center">
                    {row?.period?.name}
                  </Column>
                  <Column size={"30%"} alignTo="left">
                    {row?.amount}
                  </Column>
                </TableRow>
                ))}
              </TableContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
