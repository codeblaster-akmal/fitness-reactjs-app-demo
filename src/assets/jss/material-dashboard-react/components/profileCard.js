import Card from 'components/Card/Card';
import CardAvatar from 'components/Card/CardAvatar';
import React from 'react'
import styled from 'styled-components';
import CustomSwitch from './customSwitch';
import CardBody from "components/Card/CardBody";
import { Box, Typography } from '@material-ui/core';

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

const ProfileCard = ({ address, memberName, memberId, userName, age, phoneNo, aadhaarNo, onTogglePin, checked, profileImage }) => {
	return (
		<CardStyleWrapper>
			<Card profile>
				<CardAvatar profile>
					<a href="#user" onClick={(e) => e.preventDefault()}>
						<img src={profileImage} alt="Profile" />
					</a>
				</CardAvatar>
				<CardBody profile>
					<Typography gutterBottom fontWeight={600} fontFamily={'Poppins'} variant='subtitle1'>{memberName}</Typography>
					<Typography gutterBottom fontFamily={'Poppins'} variant='subtitle2'>{memberId} / {userName}</Typography>
					<Box display='grid' gridTemplateColumns='repeat(2, 1fr)' >
						<Typography gutterBottom fontFamily={'Poppins'} variant='caption' align={'left'} >Age:</Typography>
						<Typography gutterBottom fontFamily={'Poppins'} variant='caption' align={'left'} >{age}</Typography>
						<Typography gutterBottom fontFamily={'Poppins'} variant='caption' align={'left'} >Phone:</Typography>
						<Typography gutterBottom fontFamily={'Poppins'} variant='caption' align={'left'} >{phoneNo}</Typography>
						<Typography gutterBottom fontFamily={'Poppins'} variant='caption' align={'left'} >Aadhaar No:</Typography>
						<Typography gutterBottom fontFamily={'Poppins'} variant='caption' align={'left'} >{aadhaarNo}</Typography>
						<Typography gutterBottom fontFamily={'Poppins'} variant='caption' align={'left'} >Address:</Typography>
						<Typography gutterBottom fontFamily={'Poppins'} variant='caption' align={'left'} >{address}</Typography>
					</Box>
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
