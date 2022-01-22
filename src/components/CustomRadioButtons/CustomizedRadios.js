import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import classNames from "classnames";
import styled from "styled-components";
import PropTypes from "prop-types";

const RadioStyleWrapper = styled.div`
  .MuiFormLabel-root.Mui-focused {
    color: ${({ theme }) => theme.color.pacificBlue};
  }
  .MuiFormLabel-root {
    color: #fff;
  }
  .MuiFormControl-root ,
  .MuiFormGroup-root {
    column-gap: 1rem;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
  legend {
    margin-bottom: 10px;
  }
`;
const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#00acc1",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#00acc1",
    },
  },
});

// Inspired by blueprintjs
export function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={
        <span className={classNames(classes.icon, classes.checkedIcon)} />
      }
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function CustomizedRadios({ FormTitle, children, ...rest }) {
  return (
    <RadioStyleWrapper>
      <FormControl component="div" fullWidth>
        <FormLabel component="legend">{FormTitle}</FormLabel>
        <RadioGroup {...rest}>{children}</RadioGroup>
      </FormControl>
    </RadioStyleWrapper>
  );
}
CustomizedRadios.propTypes = {
  FormTitle: PropTypes.string,
  children: PropTypes.node,
};
