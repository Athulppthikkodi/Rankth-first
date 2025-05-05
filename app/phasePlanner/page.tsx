"use client";

import {
  Settings,
  Search,
  Plus,
  ListFilter,
  Calendar,
  Users,
  Link,
  X,
  Slack,
} from "lucide-react";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Box from "@/components/Layout/Box/Box";
import Container from "@/components/Layout/Container/Container";
import Input from "@/components/Inputs/Input/Input";
import Button from "@/components/Inputs/Button/Button";
import AvatarGroup from "@/components/DataDisplay/AvatarGroup/AvatarGroup";
import Avatar from "@/components/DataDisplay/Avatar/Avatar";
import { useState, useEffect, useRef } from "react";
import TaskTable from "@/components/Table/Table";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
import Modal from "@/components/Utils/Modal/Modal";
import Select from "@/components/Inputs/Select/Select";
import Stack from "@/components/Layout/Stack/Stack";
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

const newDropdownStyles = {
  display: "block",
  width: "100%",
  textAlign: "left" as const,
  border: "none",
  color: "rgba(55, 65, 81, 0.80)",
  fontSize: "13px",
  fontWeight: "400",
  padding: "5px 0",
  "&:hover": { boxShadow: "none" },
};
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState("task");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const taskTypeOptions = [
    { value: "link building", label: "Link Building" },
    { value: "content", label: "Content" },
    { value: "task bucket", label: "Task Bucket" },
    { value: "task", label: "Task" },
  ];

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab);
  };

  const handleNewTaskClick = () => {
    setDropdownOpen(false);
    setIsNewTaskModalOpen(true);
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

  const modalStyles = {
    backgroundColor: "white",
    borderRadius: "12px",
    width: "819px",
    position: "relative" as "relative",
    // padding: "24px",
  };

  const titleStyles = {
    fontSize: "25px",
    paddingTop: "0",
    fontWeight: "700",
    marginBottom: "16px",
    border: "none",
    background: "transparent",
    color: "var(--secondary-800)",
    paddingLeft: "0",
    "::placeholder": {
      color: "var(--secondary-800)",
      fontSize: "25px",
      fontWeight: "700",
    },
  };

  const inputStyles = {
    border: "none",
    fontSize: "14px",
    fontWeight: "400",
    width: "100%",
    minWidth: "420px",
    minHeight: "32px",
    maxHeight: "40px",
    padding: "0",
    background: "transparent",
    color: "var(--secondary-800)",
    "::placeholder": {
      color: "var(--secondary-800)",
    },
  };

  const buttonGroupStyles = {
    display: "flex",
    gap: "8px",
    marginTop: "6px",
    "& button, & input": {
      // Updated to include input styles
      padding: "6px 12px",
      fontSize: "13px",
      color: "rgba(55, 65, 81, 0.80)",
      fontWeight: "400",
      background: "white",
    },
  };

  const NewTaskModal = () => (
    <Modal
      open={isNewTaskModalOpen}
      onClose={() => setIsNewTaskModalOpen(false)}
      sx={modalStyles}
    >
      <Button
        variant="ghost"
        icon={<X size={16} />}
        onClick={() => setIsNewTaskModalOpen(false)}
        sx={{
          position: "absolute",
          top: "16px",
          right: "16px",
          padding: "0",
          "&:hover": { boxShadow: "none " },
        }}
      />
      <Box sx={{ padding: "48px 48px 24px" }}>
        <Box>
          <Typography variant="h3" sx={{marginBottom: "24px"}}>Add New</Typography>
          <Stack
            sx={{
              marginTop: "4px",
              display: "flex",
              gap: "39px",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "14px" }}>
              Choose Task Type
            </Typography>
            <Select
              value={selectedTaskType}
              onValueChange={(value) => setSelectedTaskType(value as string)}
              options={taskTypeOptions}
              placeholder="Task"
              selectSize="small"
              sx={{
                border: "1px solid rgba(55, 65, 81, 0.25)",
                minWidth: "169px",
                minHeight: "32px",
              }}
            />
          </Stack>
        </Box>
        <Box
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.26)",
            borderRadius: "6px",
            padding: "32px 34px",
            marginTop: "32px",
          }}
        >
          <Input placeholder="Enter Task" sx={titleStyles}></Input>
          <Input
            placeholder="Enter Description"
            sx={inputStyles}
            type="textarea"
            multiline
          />

          <Box sx={buttonGroupStyles}>
            <Input
              type="date"
              placeholder="Due Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              icon={<Calendar size={16} />}
              sx={{
                border: "1px solid rgba(55, 65, 81, 0.25)",
                borderRadius: "6px",
                minWidth: "120px",
                cursor: "pointer",
                color: selectedDate ? "#374151" : "rgba(55, 65, 81, 0.80)",
                "&::before": {
                  content: `"${
                    selectedDate ? formatDate(selectedDate) : "Due Date"
                  }"`,
                  position: "absolute",
                  left: "36px",
                  pointerEvents: "none",
                },
              }}
            />
            <Button
              variant="outlined"
              icon={<Users size={16} />}
              sx={{ "&:hover": { boxShadow: "none" } }}
            >
              Assignee
            </Button>
            <Button
              variant="outlined"
              icon={<Link size={16} />}
              sx={{ padding: "2px", "&:hover": { boxShadow: "none" } }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
          marginTop: "8px",
          borderTop: "1px solid rgba(0, 0, 0, 0.26)",
          padding: "32px 48px",
        }}
      >
        <Stack sx={{ display: "flex", gap: "12px" }}>
          <Button variant="outlined" sx={{ "&:hover": { boxShadow: "none" } }}>
            Godrej Properties
          </Button>
          <Button variant="outlined" sx={{ "&:hover": { boxShadow: "none" } }}>
            Task Set
          </Button>
        </Stack>

        <Button 
          variant="outlined" 
          sx={{ "&:hover": { boxShadow: "none" } }}
          onClick={() => setIsNewTaskModalOpen(false)}
        >
          Add Task Set
        </Button>
      </Box>
    </Modal>
  );

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
                  "&:hover": { background: "transparent", boxShadow: "none" },
                }}
              ></Button>
              <Box sx={{ position: "relative" }} ref={dropdownRef}>
                <Button
                  sx={{
                    borderRadius: "6px",
                    border: "1px solid rgba(55, 65, 81, 0.25)",
                    background: "rgba(255, 255, 255, 0.50)",
                    color: "#374151",
                    fontSize: "14px",
                    fontWeight: "700",
                    "&:hover": { boxShadow: "none" },
                  }}
                  variant="outlined"
                  size="small"
                  icon={<Plus size={16} />}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  New
                </Button>
                {dropdownOpen && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      transform: "translate(20%, 5px)",
                      mt: 1,
                      p: 1,
                      backgroundColor: "white",
                      borderRadius: "9px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(55, 65, 81, 0.15)",
                      zIndex: 1000,
                      maxWidth: "fit-content",
                      minWidth: "120px",
                      padding: "8px 14px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={newDropdownStyles}
                      onClick={handleNewTaskClick}
                    >
                      New Task
                    </Button>
                    <Button variant="outlined" sx={newDropdownStyles}>
                      Task Bucket
                    </Button>
                    <Button variant="outlined" sx={newDropdownStyles}>
                      Link Building
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        ...newDropdownStyles,
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    >
                      Content
                    </Button>
                    <Button variant="outlined" sx={newDropdownStyles}>
                      Import
                    </Button>
                  </Box>
                )}
              </Box>
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
      <NewTaskModal />
    </Box>
  );
}
