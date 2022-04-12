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

  const weeksFunc = (data) => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const weeks = getWeeksInMonth(year, month)
  
    return weeks.map(week => {
      return data.filter(a => {
        var dateVal = dateFunc(new Date(a.setCurrentDateTime));
        return (dateVal >= dateFunc(new Date(week.start)) && dateVal <= dateFunc(new Date(week.end)));
      }).reduce((partialSum, a) => partialSum + a.paidAmount, 0);
    })
  };

  function getWeeksInMonth(year, month) {
    const weeks = [],
      firstDate = new Date(year, month, 1),
      lastDate = new Date(year, month + 1, 0),
      numDays = lastDate.getDate();
  
    let dayOfWeekCounter = firstDate.getDay();
  
    for (let date = 1; date <= numDays; date++) {
      if (dayOfWeekCounter === 0 || weeks.length === 0) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(date);
      dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
    }
  
    const d = new Date();
  
    return weeks.filter((w) => !!w.length).map((w) => ({
      start: new Date(d.setDate(w[0])),
      end: new Date(d.setDate(w[w.length - 1])),
    }));
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
    const todayAmtSum = todayAmt.length ? todayAmt.reduce((accumulator, current) => accumulator + current.paidAmount, 0) : 0;
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
   
    return [sunAmt.length ? sunAmt.reduce((accumulator, current) => accumulator + current.paidAmount, 0) : 0, monAmt.length ? monAmt.reduce((accumulator, current) => accumulator + current.paidAmount, 0) : 0, tueAmt.length ? tueAmt.reduce((accumulator, current) => accumulator + current.paidAmount, 0) : 0, wedAmt.length ? wedAmt.reduce((accumulator, current) => accumulator + current.paidAmount, 0) : 0, thuAmt.length ? thuAmt.reduce((accumulator, current) => accumulator + current.paidAmount, 0) : 0, friAmt.length ? friAmt.reduce((accumulator, current) => accumulator + current.paidAmount, 0) : 0, satAmt.length ? satAmt.reduce((accumulator, current) => accumulator + current.paidAmount, 0) : 0];
  }

  function endFirstWeek(firstDate, firstDay) {
    if (!firstDay) {
      return 7 - firstDate.getDay();
    }
    if (firstDate.getDay() < firstDay) {
      return firstDay - firstDate.getDay();
    } else {
      return 7 - firstDate.getDay() + firstDay;
    }
  }

  function getWeeksStartAndEndInMonth(month, year) {
    let weeks = [],
      firstDate = new Date(year, month, 1),
      lastDate = new Date(year, month + 1, 0),
      numDays = lastDate.getDate(),
      date = new Date();
  
    let start = 1;
    let end = endFirstWeek(firstDate, 2);
    while (start <= numDays) {
      let newStart = new Date(new Date(date.setMonth(month)).setDate(start))
      let newEnd = new Date(new Date(date.setMonth(month)).setDate(end))
      weeks.push({ start: newStart, end: newEnd });
      start = end + 1;
      end = end + 7;
      end = start === 1 && end === 8 ? 1 : end;
      if (end > numDays) {
        end = numDays;
      }
    }
    return weeks;
  }

  const getMonthInYearFunc = (data) => {

    const res = [];
  
    const d = new Date();
    const year = d.getFullYear();
  
    for (let i = 0; i < 12; i++) {
      let result = getWeeksStartAndEndInMonth(i, year)
      res.push({ start: result[0].start, end: result[result.length - 1].end })
    }
  
    return res.map(week => {
      return data.filter(a => {
        var dateVal = dateFunc(new Date(a.setCurrentDateTime));
        return (dateVal >= dateFunc(new Date(week.start)) && dateVal <= dateFunc(new Date(week.end)));
      }).reduce((partialSum, a) => partialSum + a.amount, 0);
    })
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
      const thisMonthAmount = weeksFunc(memberTransactionData);
      const thisYearAmount = getMonthInYearFunc(memberTransactionData);
      
      const weekChartData = {
        labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        series: [ thisWeekAmount ]
      };
      const weekChartOptions = {
        high: Math.max(...thisWeekAmount),
        low: 0,
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 2 === 0 ? value : null;
          }
        }
      };

      const monthChartData = {
        labels: [...thisMonthAmount.map((da, i) => i + 1)],
        series: [ thisMonthAmount ]
      };
      const monthChartOptions = {
        high: Math.max(...thisMonthAmount),
        low: 0,
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 2 === 0 ? value : null;
          }
        }
      };

      const yearChartData = {
        labels: [...thisYearAmount.map((da, i) => i + 1)],
        series: [ thisYearAmount ]
      };
      const yearChartOptions = {
        high: Math.max(...thisYearAmount),
        low: 0,
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 2 === 0 ? value : null;
          }
        }
      };
      
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
        feeStructure,
        weekChartData,
        weekChartOptions,
        todayAmount,
        weekTotal: thisWeekAmount.reduce((partialSum, a) => partialSum + a, 0),
        monthChartData,
        monthChartOptions,
        monthTotal: thisMonthAmount.reduce((partialSum, a) => partialSum + a, 0),
        yearChartData,
        yearChartOptions,
        yearTotal: thisYearAmount.reduce((partialSum, a) => partialSum + a, 0),
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
                data={dashboards.weekChartData}
                type="Line"
                options={dashboards.weekChartOptions}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{`Week total: ₹ ${dashboards.weekTotal}`}</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  {`Today total: ₹ ${dashboards.todayAmount}`}
                </span>{" "}
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={dashboards.monthChartData}
                type="Line"
                options={dashboards.monthChartOptions}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{`Month total: ₹ ${dashboards.monthTotal}`}</h4>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={dashboards.yearChartData}
                type="Bar"
                options={dashboards.yearChartOptions}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{`Year total: ₹ ${dashboards.yearTotal}`}</h4>
            </CardBody>
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
