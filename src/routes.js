import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { HiCurrencyRupee } from "react-icons/hi";
import { BiDetail } from "react-icons/bi";
import DashboardPage from "views/Dashboard/Dashboard.js";
import MemberRegistration from "views/MemberRegistration/MemberRegistration";
import MemberList from "views/MemberList/MemberList";
import Typography from "views/Typography/Typography.js";
import FeeStructures from "views/FeeStructures/FeeStructures";
import MemberDetail from "views/MemberDetail/MemberDetail";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/member/add",
    name: "Member Registration",
    rtlName: "ملف تعريفي للمستخدم",
    icon: HowToRegIcon,
    component: MemberRegistration,
    layout: "/admin",
  },
  {
    path: "/member/edit/:id",
    name: "Member Registration",
    rtlName: "ملف تعريفي للمستخدم",
    icon: HowToRegIcon,
    component: MemberRegistration,
    layout: "/admin",
    notInSB: true
  },
  {
    path: "/table",
    name: "Member List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: MemberList,
    layout: "/admin",
  },
  {
    path: "/member/view/:id",
    name: "Member Details",
    rtlName: "خرائط",
    icon: BiDetail,
    component: MemberDetail,
    layout: "/admin",
    notInSB: true
  },
  {
    path: "/fee",
    name: "Fees structure",
    rtlName: "خرائط",
    icon: HiCurrencyRupee,
    component: FeeStructures,
    layout: "/admin",
  }
];

export default dashboardRoutes;
