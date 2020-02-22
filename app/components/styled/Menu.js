import styled from 'styled-components';

import { NavLink } from './Nav';

export const MenuContainer = styled.div`
  width: 33%;
  max-width: 300px;
  background-color: white;
  height: 100vh;
  margin-top: 3rem;
  overflow: auto;
  order: -1;
`;

export const Menu = styled.menu`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
`;

export const MenuItem = styled(NavLink)`
  margin: 1rem;
  cursor: pointer;
`;
