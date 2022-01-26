import React from 'react'
import styled from 'styled-components';
import CustomSwitch from './customSwitch';

const CardStyleWrapper = styled.div`
  .content {
	 position: relative;
	}
	.switch-container{
		position: absolute;
		top: 0.5rem;
		right: 1.5rem;	
	}
 .card {
	 /* width: 500px; */
	 /* min-height: 100px; */
	 padding: 20px;
	 border-radius: 3px;
	 background-color: ${({ theme }) => theme.color.black};;
	 box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
	 position: relative;
	 overflow: hidden;
}
 .card:after {
	 content: '';
	 display: block;
	 width: 200px;
     height: 320px;
	 background: ${({ theme }) => theme.color.pacificBlue};;
	 position: absolute;
	 animation: rotatemagic 0.75s cubic-bezier(0.425, 1.04, 0.47, 1.105) 1s both;
}
 .firstinfo {
     display: flex;
     align-items: center;
     /* justify-content: space-between; */
     column-gap: 1rem;
	 z-index: 2;
	 position: relative;
}
 .firstinfo img {
	 border-radius: 50%;
	 width: 120px;
	 height: 120px;
}
 .firstinfo .profileinfo {
	 padding: 0px 20px;
}
 .firstinfo .profileinfo h1 {
	 font-size: 1.2em;
     margin: 0;
}
 .firstinfo .profileinfo h3 {
	 font-size: 1em;
	 color: #009688;
	 font-style: italic;
     margin: 0;
}
 .firstinfo .profileinfo p.bio {
	 padding: 10px 0px;
	 color: #5a5a5a;
	 line-height: 0;
	 font-style: initial;
     margin: 0;
}
 @keyframes rotatemagic {
	 0% {
		 opacity: 0;
		 transform: rotate(0deg);
		 top: -24px;
		 left: -253px;
	}
	 100% {
		 transform: rotate(-30deg);
		 top: -24px;
		 left: -78px;
	}
}
`;

const ProfileCard = ({ memberName, memberId, userName, phoneNo, aadhaarNo, profileImage, onTogglePin, checked }) => {
	return (
		<CardStyleWrapper>
			<div className="content">
				<div className="card">
					<div className="firstinfo">
						<img src={profileImage} />
						<div className="profileinfo">
							<h1>{memberName}</h1>
							<h3>{memberId} / {userName}</h3>
							<p className="bio">Ph: {phoneNo}</p>
							<p className="bio">Aadhaar No: {aadhaarNo}</p>
						</div>
					</div>
					<div className="switch-container">
						<CustomSwitch
							checked={checked}
							onChange={onTogglePin}
						/>
					</div>
				</div>
			</div>
		</CardStyleWrapper>
	)
}

export default ProfileCard
