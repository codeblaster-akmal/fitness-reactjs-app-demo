import {
  blackColor,
  // whiteColor,
  hexToRgb,
  // matBlackColor,
} from "assets/jss/material-dashboard-react.js";

const cardStyle = {
  card: {
    backdropFilter: "blur(20px) saturate(99%)",
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "#fff",
    background: "rgba(46, 47, 50, 0.7)",
    width: "100%",
    boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none",
  },
  cardProfile: {
    marginTop: "30px",
    textAlign: "center",
  },
  cardChart: {
    "& p": {
      marginTop: "0px",
      paddingTop: "0px",
    },
  },
};

export default cardStyle;
