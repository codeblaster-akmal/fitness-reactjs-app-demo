import Card from 'components/Card/Card';
import CardAvatar from 'components/Card/CardAvatar';
import React from 'react'
import styled from 'styled-components';
import CustomSwitch from './customSwitch';
import CardBody from "components/Card/CardBody";
import { Typography } from '@material-ui/core';
import defaultAvatar from "assets/img/Pro-Fit Gym Logo and Mockups/Avatars-02.jpg"

const CardStyleWrapper = styled.div` 
padding : 1rem;
	.switch-container{
		display: flow-root;	
		margin-top: 1rem;
		> div{
			float: right;
		}		
	}
`;

const ProfileCard = ({ address, memberName, memberId, userName, age, phoneNo, aadhaarNo, onTogglePin, checked }) => {
	return (
		<CardStyleWrapper>
			<Card profile>
				<CardAvatar profile>
					<a href="#user" onClick={(e) => e.preventDefault()}>
						<img src={defaultAvatar} alt="Profile" />
					</a>
				</CardAvatar>
				<CardBody profile>
					<Typography gutterBottom fontWeight={600} fontFamily={'Poppins'} variant='subtitle1'>{memberName}</Typography>
					<Typography gutterBottom fontFamily={'Poppins'} variant='subtitle2'>{memberId} / {userName}</Typography>
					<Typography gutterBottom fontFamily={'Poppins'} variant='caption' display={'block'} align={'left'} >Age: {age}</Typography>
					<Typography gutterBottom fontFamily={'Poppins'} variant='caption' display={'block'} align={'left'} >Phone: {phoneNo}</Typography>
					<Typography gutterBottom fontFamily={'Poppins'} variant='caption' display={'block'} align={'left'} >Aadhaar No: {aadhaarNo}</Typography>
					<Typography gutterBottom fontFamily={'Poppins'} variant='caption' display={'block'} align={'left'} >Address: {address}</Typography>
					<div className="switch-container">
						<CustomSwitch
							label="Forgot Pin"
							checked={checked}
							onChange={onTogglePin}
						/>
					</div>
				</CardBody>
			</Card>
		</CardStyleWrapper>
	)
}

export default ProfileCard
