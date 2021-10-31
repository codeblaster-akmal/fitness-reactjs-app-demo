import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    margin: "0 -15px !important",
    width: "unset",
  },
};


export default function GridContainer(props) {
  const { children, spacing, className, ...rest } = props;
  return (
    <Grid container spacing={spacing} {...rest} style={styles.grid} className={className}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  spacing: PropTypes.number,
};
