import { PersonalInformation } from '@models/core';

export interface Jwt {
  id: number;
  username: string;
  roles: string[];
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  personalInformation: PersonalInformation;
}
