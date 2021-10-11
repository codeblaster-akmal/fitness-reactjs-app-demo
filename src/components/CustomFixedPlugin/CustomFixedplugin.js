import React from 'react'
import classnames from "classnames";

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
        <div
            className={classnames("fixed-plugin")}
        >
            <div id="fixedPluginClasses" className={fixedClasses}>
                <div onClick={handleFixedClick}>
                    <h5>Pay now</h5>
                </div>
                {children}
            </div>
        </div>
    )
}

export default CustomFixedplugin
