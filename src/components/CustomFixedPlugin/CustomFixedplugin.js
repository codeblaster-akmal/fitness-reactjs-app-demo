import React from 'react'
import classnames from "classnames";
import { FaGooglePay } from "react-icons/fa";
import styled from 'styled-components';

const CustomerFixedPluginStyles = styled.div`
  #fixedPluginClasses{
      padding: 1rem;
      h2{
          margin:0; 
          line-height:0;
        }
  }
`;

const CustomFixedplugin = ({ children }) => {
    const [fixedClasses, setFixedClasses] = React.useState("dropdown");
    const handleFixedClick = () => {
        if (fixedClasses === "dropdown") {
            setFixedClasses("dropdown show");
        } else {
            setFixedClasses("dropdown");
        }
    };
    return (
        <CustomerFixedPluginStyles>
            <div
                className={classnames("fixed-plugin")}
            >
                <div id="fixedPluginClasses" className={fixedClasses}>
                    <div onClick={handleFixedClick}>
                        <h2>
                            <FaGooglePay />
                        </h2>
                    </div>
                    {children}
                </div>
            </div>
        </CustomerFixedPluginStyles>
    )
}

export default CustomFixedplugin
