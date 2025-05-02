import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects($agencyId: ID) {
    projects(agencyId: $agencyId) {
      id
      name
      status
    }
  }
`;
