import { Document } from 'mongoose';

export interface User extends Document {
  readonly link: string;
  createdAt: string;
  updatedAt: string;
  readonly firstName: string;
  readonly middleName: string;
  readonly lastName: string;
  readonly password: string;
  readonly email: string;
  readonly twets: string[];
  readonly tags: string[];
}
