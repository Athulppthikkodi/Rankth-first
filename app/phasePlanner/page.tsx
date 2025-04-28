"use client";

import { Settings, Search, Plus, ListFilter } from "lucide-react";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Box from "@/components/Layout/Box/Box";
import Container from "@/components/Layout/Container/Container";
import Input from "@/components/Inputs/Input/Input";
import Button from "@/components/Inputs/Button/Button";
import AvatarGroup from "@/components/DataDisplay/AvatarGroup/AvatarGroup";
import Avatar from "@/components/DataDisplay/Avatar/Avatar";
import { useState } from "react";
import TaskTable from "@/components/Table/Table";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
type TabValue = "list" | "board" | "timeline";

const ListContent = () => (
  <Box>
    <Typography variant="h6">
      {" "}
      <TaskTable />
    </Typography>
    {/* Add your list view content here */}
  </Box>
);

const BoardContent = () => (
  <Box>
    <Typography variant="h6">Board View Content</Typography>
    {/* Add your board view content here */}
  </Box>
);

const TimelineContent = () => (
  <Box>
    <Typography variant="h6">Timeline View Content</Typography>
    {/* Add your timeline view content here */}
  </Box>
);

export default function PhasePlanner() {
  const [activeTab, setActiveTab] = useState<TabValue>("list");

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab);
  };

  const tabButtonStyles = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 0",
    cursor: "pointer",
    color: "#374151",
    fontWeight: (tab: TabValue) => (activeTab === tab ? "700" : "400"),
    borderBottom: (tab: TabValue) =>
      activeTab === tab ? "2px solid #00D47E" : "none",
    "&:hover": { FontWeights: "700" },
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "list":
        return <ListContent />;
      case "board":
        return <BoardContent />;
      case "timeline":
        return <TimelineContent />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ background: "#F1F5F8", minHeight: "100svh" }}>
      <MainNavigation items={[]} />
      <Container>
        <Box sx={{ padding: "80px 0 74px" }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Typography variant="h4">Phase Planner</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 5px",
                  color: "#374151",
                }}
              >
                <Typography variant="body2">Godrej Properties</Typography>
                <span>/</span>
                <Typography variant="body2">Phase Planner</Typography>
              </Box>
              <AvatarGroup max={3} sx={{ margin: "0 5px" }} spacing={-8}>
                <Avatar src="" alt="User Avatar" size="small" />
                <Avatar src="" alt="User Avatar" size="small" />
                <Avatar src="" alt="User Avatar" size="small" />
                <Avatar src="" alt="User Avatar" size="small" />
              </AvatarGroup>
              <Button
                variant="outlined"
                sx={{
                  margin: "0 5px",
                  padding: "0",
                  border: "none",
                  background: "transparent",
                  color: "#374151",
                  fontSize: "14px",
                  fontWeight: "700",
                  "&:hover": { background: "transparent" },
                }}
              >
                Share
              </Button>
              <Button
                variant="outlined"
                size="medium"
                icon={<Settings size={16} />}
                sx={{
                  margin: "0 5px",
                  border: "none",
                  padding: "0",
                  background: "transparent",
                  color: "#374151",
                  "&:hover": { background: "transparent" },
                }}
              ></Button>
              <Button
                sx={{
                  borderRadius: "6px",
                  border: "1px solid rgba(55, 65, 81, 0.25)",
                  background: "rgba(255, 255, 255, 0.50)",
                  color: "#374151",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
                variant="outlined"
                size="small"
                icon={<Plus size={16} />}
              >
                New
              </Button>
            </Box>
          </Box>

          {/* Navigation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              padding: "16px 0 0",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <Box sx={{ display: "flex", gap: "24px" }}>
              <Box
                onClick={() => handleTabChange("list")}
                sx={{
                  ...tabButtonStyles,
                  fontWeight: activeTab === "list" ? "700" : "400",
                  borderBottom:
                    activeTab === "list" ? "2px solid #00D47E" : "none",
                }}
              >
                <Typography variant="body2">List</Typography>
              </Box>
              <Box
                onClick={() => handleTabChange("board")}
                sx={{
                  ...tabButtonStyles,
                  fontWeight: activeTab === "board" ? "700" : "400",
                  borderBottom:
                    activeTab === "board" ? "2px solid #00D47E" : "none",
                }}
              >
                <Typography variant="body2">Board</Typography>
              </Box>
              <Box
                onClick={() => handleTabChange("timeline")}
                sx={{
                  ...tabButtonStyles,
                  fontWeight: activeTab === "timeline" ? "700" : "400",
                  borderBottom:
                    activeTab === "timeline" ? "2px solid #00D47E" : "none",
                }}
              >
                <Typography variant="body2">Timeline</Typography>
              </Box>
            </Box>
            <Button
              sx={{
                border: "none",
                background: "transparent",
                color: "#374151",
                padding: "0",
                "&:hover": { background: "transparent" },
              }}
              variant="outlined"
              size="small"
              icon={<ListFilter size={14} color="#374151" />}
            >
              Filter
            </Button>
            <Input
              placeholder="Search Tasks"
              size="small"
              sx={{ minWidth: "240px", border: "none" }}
              icon={<Search size={16} />}
            />
          </Box>

          {/* Content area */}
          <Box sx={{ padding: "24px 0" }}>{renderTabContent()}</Box>
        </Box>
      </Container>
    </Box>
  );
}
