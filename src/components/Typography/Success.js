import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/typographyStyle.js";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Success(props) {
  const classes = useStyles();
  const { children } = props;
  return (
    <Box display={'inline'} fontSize={'12px'} border={'1px solid'} borderRadius={3} px={1} py={'1px'} className={classes.defaultFontStyle + " " + classes.successText}>
      {children}
    </Box>
  );
}

Success.propTypes = {
  children: PropTypes.node,
};
