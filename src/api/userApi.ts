import mock from '../utils/mock.ts';
import { ApiWrapper } from './ApiWrapper.ts';
import client from './client.ts';

export const getUserDetails = async (loginToken: string) => {
  try {
    const response = await client.get('/user', {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });

    if (response?.data?.success) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log('user error:', error);
    return null;
  }
};

export const logoutUser = async (loginToken: string) => {
  try {
    const response = await client.delete('/user/logout', {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
    if (response?.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('user logut error:', error);
    return false;
  }
};

export const userSocieties = (role: any) =>
  ApiWrapper(new Promise(resolve => resolve(mock.resident)));

export const userVisitors = () =>
  ApiWrapper(new Promise(resolve => resolve(mock.visitors)));
