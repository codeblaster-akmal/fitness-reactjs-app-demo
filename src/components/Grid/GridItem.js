import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    paddingLeft: "15px",
    paddingRight: "15px",
  },
};


export default function GridItem(props) {
  const { children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={className} style={styles.grid}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
};
