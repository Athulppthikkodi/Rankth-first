import { gql } from '@apollo/client';

export const CREATE_AGENCY = gql`
  mutation CreateAgency($input: CreateAgencyInput!) {
    createAgency(input: $input) {
      id
      name
      website
    }
  }
`;

export interface CreateAgencyInput {
  name: string;
  website: string;
  ownerId: string;
}

export interface CreateAgencyResponse {
  createAgency: {
    id: string;
    name: string;
    website: string;
    owner: {
      id: string;
    };
    __typename?: string;
  };
}
