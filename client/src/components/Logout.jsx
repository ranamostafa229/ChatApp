import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleClick = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff title="logout" />
    </Button>
  );
};

const Button = styled.div`
  display: flex;
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background-color: #f5f6fa;
  }
  svg {
    font-size: 1.3rem;
    transition: 0.3s ease-in-out;
    color: #767b91;
    &:hover {
      color: #16d991;
    }
  }
`;
export default Logout;
