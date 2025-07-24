import { Axios, AxiosError } from 'axios';
import client from './client';

export const getUserFlatList = async (loginToken: string) => {
  try {
    const response = await client.get('/flat/secured/all-flats', {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
    console.log('flats: ', response);

    return { data: response.data.data };
  } catch (error) {
    let err = error as AxiosError;
    console.log('user error:', error);
    return { error: err.response?.data.message };
  }
};

export const registerFlatRequest = async (
  flatId: string,
  loginToken: string,
) => {
  try {
    const response = await client.post(
      '/flat/secured/register-request',
      {
        flat_id: flatId,
      },
      {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      },
    );
    return { data: response.data.data };
  } catch (error) {
    let err = error as AxiosError;
    console.log('user error:', error);
    return { error: err.response?.data.message };
  }
};

export const fetchBlockAndFlatsForSociety = async (societyId: string) => {
  try {
    const response = await client.get(`/flat/public/flat-list/${societyId}`);
    console.log('response client:', response);

    return { data: response.data.data };
  } catch (error) {
    let err = error as AxiosError;
    return { error: err.response?.data.message };
  }
};

export const registerFlats = async (
  societyId: string,
  flats: any[],
  loginToken: string,
) => {
  console.log('values : ', flats, societyId);

  try {
    const response = await client.post(
      `/flat/secured/manual-register`,
      {
        society_id: societyId,
        flats: flats,
      },
      {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      },
    );
    if (response?.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
