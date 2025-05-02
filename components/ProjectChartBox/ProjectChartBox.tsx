import React from 'react'
import Typography from '../DataDisplay/Typography/Typography'
import Box from '../Layout/Box/Box'
import DualMetricChart from '../chart/DualMetricChart/DualMetricChart'
import AvatarGroup from '../DataDisplay/AvatarGroup/AvatarGroup';
import Avatar from '../DataDisplay/Avatar/Avatar'

interface AvatarData {
  src: string;
  name: string;
}

interface ProjectChartBoxProps {
  avatarCount: number;
  avatarData: AvatarData[];
  projectName?: string;
  handleNavigate: () => void;
}

export const ProjectChartBox: React.FC<ProjectChartBoxProps> = ({avatarCount, avatarData,projectName, handleNavigate}) => {
  return (
    <Box onClick={handleNavigate} sx={{padding: "28px 28px 18px", background: "#fff" , maxWidth: "364px", borderRadius: "26px", border: "0.964px solid #DFE3EE",
     cursor: "pointer"
    }}>
        <Typography variant='h5' sx={{fontSize: "16px" , paddingBottom: "13px"}}>{projectName}</Typography>
        <DualMetricChart />
        <AvatarGroup max={avatarCount} spacing={-10} sx={{ marginTop: "13px" }}>
            {
                avatarData.map((user, index) => (
                    <Avatar key={index} src={user.src} alt={user.name} size='small'/>
                ))
            }
                   
        </AvatarGroup>
    </Box>
  )
}
