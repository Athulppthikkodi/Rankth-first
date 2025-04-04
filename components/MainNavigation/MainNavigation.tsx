import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Box from "../Layout/Box/Box";
import Container from "../Layout/Container/Container";
import { usePathname } from 'next/navigation';

// Types
interface NavItemProps {
  label: string;
  to: string; // Path to navigate to
  active?: boolean;
}

interface MainNavigationProps {
  logo?: React.ReactNode;
  logoUrl?: string; // URL for the logo to link to
  items: NavItemProps[];
  avatarSrc?: string;
  onAvatarClick?: () => void;
}

// Styled Components
const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 64px;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.25rem;
`;

const LogoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #00c165;
  border-radius: 50%;
  color: white;
  font-size: 0.9rem;
  margin-right: 8px;
`;

const NavItemsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
`;

interface NavItemStyledProps {
  'data-active': string;
}

const NavItemStyled = styled(Link)<NavItemStyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 14px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props['data-active'] === 'true' ? "#00c165" : "#454545")};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  text-decoration: none;

  &:hover {
    color: #00c165;
  }

  &:focus {
    outline: none;
  }
`;

const LinkInitial = styled.sup`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  color: black;
  opacity: 0.2;
  border-radius: 9px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: 160px;
`;

const Avatar = styled.button`
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background-color: #eaeaea;
  border: none;
  cursor: pointer;
  overflow: hidden;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4a4a4a;
  color: white;
  font-weight: 500;
`;

const NavItem: React.FC<NavItemProps> = ({
  label,
  to,
  active = false,
}) => {
  const pathname = usePathname();
  const isActive = pathname === to;
  
  return (
    <NavItemStyled href={to} data-active={isActive.toString()}>
      {label}
      <LinkInitial>{label.charAt(0).toUpperCase()}</LinkInitial>
    </NavItemStyled>
  );
};

const MainNavigation: React.FC<MainNavigationProps> = ({
  logo,
  logoUrl = "/",
  items,
  avatarSrc,
  onAvatarClick,
}) => {
  return (
    <Box
      display="flex"
      bgcolor="#ffffff"
      boxShadow="0 1px 3px rgba(55, 65, 81, 0.05)"
      sx={{ padding: "28px 0", justifyContent: "center" , position: "sticky",left:0,top: 0, width: "100%", zIndex: 1000 }}
    >
      <Container maxWidth="lg">
        <NavContainer>
          <LogoContainer>
            {logo ? (
              <LogoLink href={logoUrl}>{logo}</LogoLink>
            ) : (
              <LogoLink href={logoUrl}>
                <Logo>
                  <LogoIcon>R</LogoIcon>
                  RANKTH
                </Logo>
              </LogoLink>
            )}
          </LogoContainer>

          <NavItemsContainer>
            {items.map((item, index) => (
              <NavItem
                key={index}
                label={item.label}
                to={item.to}
                
              />
            ))}
          </NavItemsContainer>

          <RightSection>
            <Avatar onClick={onAvatarClick}>
              {avatarSrc ? (
                <img src={avatarSrc} alt="User Avatar" />
              ) : (
                <AvatarPlaceholder>J</AvatarPlaceholder>
              )}
            </Avatar>
          </RightSection>
        </NavContainer>
      </Container>
    </Box>
  );
};

export default MainNavigation;
