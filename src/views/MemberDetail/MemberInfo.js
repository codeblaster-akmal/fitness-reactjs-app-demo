import React, { useState } from 'react'
import ProfileCard from '../../assets/jss/material-dashboard-react/components/profileCard'
import avatar from "../../assets/img/Pro-Fit/Avatars-02.jpg";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import MemberTrack from './MemberTrack';
import { updateMember } from "./MemberDetail.service";
import { MSG_TYPE } from "components/Snackbar/AlertToaster";
import { useToaster } from 'components/Snackbar/AlertToaster';
import CustomDialogBox from '../../assets/jss/material-dashboard-react/components/customDialog';

const MemberInfo = ({ member }) => {
    const toaster = useToaster();
    const [checked, setChecked] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false)
        setChecked(false)
    }
    const onTogglePin = () => {
        setChecked(true);
        setDialogOpen(true)
    };

    const onResetPin = async () => {
        try {
            let payload = {};
            payload = { isSignup: false };
            await updateMember(member.id, payload);
            setChecked(false);
            toaster(MSG_TYPE.SUCCESS, "You can change your PIN");
            setDialogOpen(false)
        } catch (err) {
            toaster(MSG_TYPE.WARNING, err);
        }
    }
    return (
        <GridContainer spacing={4}>
            <GridItem xs={12} sm={6} md={8} lg={8}>
                <MemberTrack member={member} />
            </GridItem>
            <GridItem xs={12} sm={6} md={4} lg={4}>
                <ProfileCard address={member.address} profileImage={member.image || avatar} memberName={`${member.firstname} ${member.lastname}`} memberId={member.memberId}
                    userName={member.username} age={member.age} phoneNo={member.phone} aadhaarNo={member.aadhaarNo || '-'} onTogglePin={onTogglePin} checked={checked} />
            </GridItem>
            <CustomDialogBox open={dialogOpen} onclickconfirm={onResetPin} handleClose={handleDialogClose} dialogtitle={'Please Confirm !'} dialogcontenttext={'Do you want to reset and generate a new pin for this member ?'} />
        </GridContainer>
    )
}

export default MemberInfo
