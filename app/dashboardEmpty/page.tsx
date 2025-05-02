"use client";
import React, { useState } from "react";
import Box from "@/components/Layout/Box/Box";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Container from "@/components/Layout/Container/Container";
import Button from "@/components/Inputs/Button/Button";
import Navbar from "@/components/Menu/Menu";
import Modal from "@/components/Utils/Modal/Modal";
import TimelinePopup from "@/components/Popup/TimelinePopup/TimelinePopup";
import AddTeamPopup from "@/components/Popup/AddTeamPopup/AddTeamPopup";
import ModePopup from "@/components/Popup/ModePopup/ModePopup";
import { TentTree } from "lucide-react";
import { GET_PROJECTS } from "@/graphql/query/projects";
import { useQuery } from "@apollo/client";
import { ProjectChartBox } from "@/components/ProjectChartBox/ProjectChartBox";
import avatarIconOne from "@/public/avatar-icon-one.svg";
import avatarIconTwo from "@/public/avatar-icon-two.svg";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";  
import { FormState } from "@/store/slices/formSlice";
interface Project {
  name: string;
  id: string;
  status: string;
}
export interface RootState {
  form: FormState;
  // add other slices of your store here
}

const Page = () => {
  const [timelinePopup, setTimelinePopup] = useState(false);
  const [addTeamPopup, setAddTeamPopup] = useState(false);
  const [modePopup, setModePopup] = useState(false);
  const agencyId = useSelector((state: RootState) => state.form.agencyId);
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(GET_PROJECTS,{
    variables:{
      agencyId: agencyId
    }
  });
  const projects = data?.projects || [];

  const avatarData = [
    { name: "User 1", src: avatarIconOne },
    { name: "User 2", src: avatarIconTwo },
    { name: "User 2", src: avatarIconTwo },
    { name: "User 2", src: avatarIconTwo },
    { name: "User 2", src: avatarIconTwo },
    { name: "User 2", src: avatarIconTwo },
  ]
  function handleNavigate() {
    router.push("/phasePlanner");
  }
  function handleTimelinePopupClose() {
    setTimelinePopup(false);
    refetch();
  }

  function handleAddTeamPopupOpen() {
    setTimelinePopup(false);
    setAddTeamPopup(true);
  }

  function handleAddTeamPopupClose() {
    setAddTeamPopup(false);
    setTimelinePopup(true);
  }

  function handleModalPopupOpen() {
    setAddTeamPopup(false);
    setModePopup(true);
  }

  function handleModePopupClose() {
    setModePopup(false);
    setAddTeamPopup(true);
  }

  function handleFinishPopup() {
    setTimelinePopup(false);
    setAddTeamPopup(false);
    setModePopup(false);
    refetch();
  }


  return (
    <Box sx={{ background: "#F1F5F8", height: "100svh" }}>  
      <MainNavigation items={[]} />
      <Box>
        <Container>
          <Typography
            variant="h4"
            component="h1"
            sx={{ paddingTop: "27px", color: "rgba(55, 65, 81, 0.60)" }}
          >
            Projects
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">Error loading projects</Typography>
          ) : projects.length > 0 ? (
            <Box sx={{padding: "20px 0"}}>
              {projects.map((project: Project) => (
             <ProjectChartBox avatarCount={3} avatarData={avatarData} projectName={project.name} key={project.id} handleNavigate={handleNavigate} />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "144px",
              }}
            >
              <Box
                sx={{
                  maxWidth: "364px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TentTree size={70} strokeWidth={0.5} />
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    textAlign: "center",
                    paddingBottom: "13px",
                    marginTop: "18px",
                  }}
                >
                  Relax! You have no projects
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    fontSize: "13px",
                    paddingBottom: "18px",
                    textAlign: "center",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur unde suscipit, quam beatae rerum inventore
                  consectetur, neque doloribus
                </Typography>
                <Button onClick={() => setTimelinePopup(true)}>
                  Add New Project
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
      <Navbar />
      <Modal open={timelinePopup} onClose={handleTimelinePopupClose}>
        <TimelinePopup
          handleClose={handleTimelinePopupClose}
          handleNextPopup={handleAddTeamPopupOpen}
          handleSkip={handleAddTeamPopupOpen}
        />
      </Modal>
      <Modal open={addTeamPopup} onClose={handleAddTeamPopupClose}>
        <AddTeamPopup
          handleClose={handleAddTeamPopupClose}
          handleNextPopup={handleModalPopupOpen}
          handleSkip={handleModalPopupOpen}
        />
      </Modal>
      <Modal open={modePopup} onClose={handleModePopupClose}>
        <ModePopup
          handleClose={handleModePopupClose}
          handleContinue={handleFinishPopup}
          handleSkip={handleFinishPopup}
        />
      </Modal>
    </Box>
  );
};

export default Page;
