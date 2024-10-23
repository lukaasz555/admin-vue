import { IUserPayload } from '../interfaces/user-payload';

export function getUserPayloadFromToken(token: string): IUserPayload {
  try {
    const [, payload] = token.split('.');
    const userPayload = JSON.parse(atob(payload));

    if (
      userPayload.id &&
      userPayload.email &&
      userPayload.role &&
      userPayload.privileges
    ) {
      return userPayload as IUserPayload;
    } else {
      throw new Error('Invalid token');
    }
  } catch (err) {
    console.error(err);
    throw new Error('Token parsing error');
  }
}
