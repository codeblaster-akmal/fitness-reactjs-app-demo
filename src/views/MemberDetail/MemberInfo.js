import React, { useState } from 'react'
import ProfileCard from 'assets/jss/material-dashboard-react/components/profileCard'
import avatar from "assets/img/Pro-Fit Gym Logo and Mockups/Avatars-02.jpg";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import MemberTrack from './MemberTrack';
import { updateMember } from "./MemberDetail.service";
import { MSG_TYPE } from "components/Snackbar/AlertToaster";
import { useToaster } from 'components/Snackbar/AlertToaster';

const MemberInfo = ({ member }) => {
    const toaster = useToaster();
    const [checked, setChecked] = useState(false);

    const onTogglePin = async () => {
        try {
            setChecked(true);
            let payload = {};
            payload = { isSignup: false };
            await updateMember(member.id, payload);
            setChecked(false);
            toaster(MSG_TYPE.SUCCESS, "You can change your PIN");
        } catch (err) {
            toaster(MSG_TYPE.WARNING, err);
        }
    };

    return (
        <GridContainer spacing={4}>
            <GridItem xs={12} sm={12} md={6} lg={6}>
                <MemberTrack member={member} />
            </GridItem>
            <GridItem xs={12} sm={12} md={4} lg={4}>
                <ProfileCard profileImage={member.image || avatar} memberName={`${member.firstname} ${member.lastname}`} memberId={member.memberId}
                    userName={member.username} phoneNo={member.phone} aadhaarNo={member.aadhaarNo || '-'} onTogglePin={onTogglePin} checked={checked} />
            </GridItem>
        </GridContainer>
    )
}

export default MemberInfo
