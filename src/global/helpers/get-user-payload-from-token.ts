import { IUserPayload } from '../interfaces/user-payload';

export function getUserPayloadFromToken(token: string): IUserPayload {
  const [, payload] = token.split('.');
  const userPayload = JSON.parse(atob(payload));

  if (
    userPayload.id &&
    userPayload.email &&
    userPayload.role &&
    userPayload.privileges
  ) {
    return userPayload as IUserPayload;
  }
  throw new Error('Invalid token');
}
