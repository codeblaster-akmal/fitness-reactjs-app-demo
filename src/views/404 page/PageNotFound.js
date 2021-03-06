import React from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from "components/CustomButtons/Button.js";

const PageLayoutWrapper = styled.div`
position: relative;
height: 100vh;
background: #030005;
.notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  max-width: 767px;
  width: 100%;
  line-height: 1.4;
  text-align: center;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
	.notfound-404 {
		position: relative;
		height: 180px;
		margin-bottom: 20px;
		z-index: -1;
		h1 {
		font-family: 'Montserrat', sans-serif;
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50% , -50%);
			-ms-transform: translate(-50% , -50%);
				transform: translate(-50% , -50%);
		font-size: 224px;
		font-weight: 900;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: -12px;
		color: #030005;
		text-transform: uppercase;
		text-shadow: -1px -1px 0px #8400ff, 1px 1px 0px #ff005a;
		letter-spacing: -20px;
		}
		h2 {
		font-family: 'Montserrat', sans-serif;
		position: absolute;
		left: 0;
		right: 0;
		top: 110px;
		font-size: 42px;
		font-weight: 700;
		color: #fff;
		text-transform: uppercase;
		text-shadow: 0px 2px 0px #8400ff;
		letter-spacing: 13px;
		margin: 0;
		}
	}

}
`;


const PageNotFound = () => {
	const history = useHistory()
	return (
		<PageLayoutWrapper>
			<div className="notfound">
				<div className="notfound-404">
					<h1>404</h1>
					<h2>Page not found</h2>
				</div>
				<Button color="info" onClick={() => history.push('/login')}>
					Back to Login
				</Button>
			</div>
		</PageLayoutWrapper>
	)
}

export default PageNotFound