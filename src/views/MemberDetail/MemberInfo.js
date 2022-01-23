import React from 'react'
import ProfileCard from 'assets/jss/material-dashboard-react/components/profileCard'
import avatar from "assets/img/Pro-Fit Gym Logo and Mockups/Avatars-02.jpg";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import MemberTrack from './MemberTrack';

const MemberInfo = ({ member }) => {
    return (
        <GridContainer spacing={4}>
            <GridItem xs={12} sm={12} md={6} lg={6}>
                <MemberTrack />
            </GridItem>
            <GridItem xs={12} sm={12} md={6} lg={6}>
                <ProfileCard profileImage={member.image || avatar} memberName={`${member.firstname} ${member.lastname}`} memberId={member.memberId}
                    userName={member.username} phoneNo={member.phone} aadhaarNo={member.aadhaarNo || '-'} />
            </GridItem>
        </GridContainer>
    )
}

export default MemberInfo
