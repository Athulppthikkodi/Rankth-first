  import React, { useState } from "react";
  import styled from "@emotion/styled";
  import { Plus, CheckCheck, Search, Bell, LayoutGrid, Settings2 } from "lucide-react";

  // Styled components using Emotion
  const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 16px;
    background: rgba(24, 23, 53, 0.9);
    backdrop-filter: blur(4px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: fit-content;
    position: fixed;
    bottom: 24px;
    right: 50%;
    transform: translateX(50%);
  `;

  const IconButton = styled.button<{ isActive?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) =>
      props.isActive ? "rgba(255, 255, 255, 0.1)" : "transparent"};
    color: ${(props) => (props.isActive ? "#fff" : "rgba(255, 255, 255, 0.7)")};
    border: none;
    border-radius: 6px;
    padding: 8px;
    margin: 0 10px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
  `;

  // Types for the Navbar component
  interface NavbarProps {
    onIconClick?: (iconName: string) => void;
  }

  const Navbar: React.FC<NavbarProps> = ({ onIconClick }) => {
    const [activeIcon, setActiveIcon] = useState<string | null>("check");

    const handleClick = (iconName: string) => {
      setActiveIcon(iconName);
      if (onIconClick) {
        onIconClick(iconName);
      }
    };

    return (
      <NavbarContainer>
        <IconButton
          isActive={activeIcon === "plus"}
          onClick={() => handleClick("plus")}
          aria-label="Add"
        >
          <Plus size={20} />
        </IconButton>

        <IconButton
          isActive={activeIcon === "check"}
          onClick={() => handleClick("check")}
          aria-label="Check"
        >
          <CheckCheck size={20}  />
        </IconButton>

        <IconButton
          isActive={activeIcon === "search"}
          onClick={() => handleClick("search")}
          aria-label="Search"
        >
          <Search size={20} />
        </IconButton>

        <IconButton
          isActive={activeIcon === "bell"}
          onClick={() => handleClick("bell")}
          aria-label="Notifications"
        >
          <Bell size={20} />
        </IconButton>
        <IconButton
          isActive={activeIcon === "menu"}
          onClick={() => handleClick("menu")}
          aria-label="Menu"
        >
         <Settings2 size={20} strokeWidth={2} />
        </IconButton>
        <IconButton
          isActive={activeIcon === "grid"}
          onClick={() => handleClick("grid")}
          aria-label="Dashboard"
        >
          <LayoutGrid size={20} />
        </IconButton>
      </NavbarContainer>
    );
  };

  export default Navbar;

  // Usage example
  export const NavbarExample: React.FC = () => {
    const handleIconClick = (iconName: string) => {
      console.log(`Icon clicked: ${iconName}`);
      // Handle the click event
    };

    return <Navbar onIconClick={handleIconClick} />;
  };
