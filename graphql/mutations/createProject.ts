import { gql } from '@apollo/client';

export interface CreateProjectInput {
  name: string;
  startDate: string;
  endDate: string;
  agencyId: string;
}

export interface CreateProjectResponse {
  createProject: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  };
}

export const CREATE_PROJECT = gql`
  mutation createProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      startDate
      endDate
    }
  }
`;
