import { SocietyTypes } from '../types';
import client from './client';

export const getAllSocitiesFromCity = async (city: string, state: string) => {
  try {
    const response = await client.get(
      `/society/public/societies-list?city=${city}&state=${state}`,
    );
    console.log('socieites:', response);
    if (response?.data) {
      return response.data.data;
    } else return [];
  } catch (error) {
    console.log('error in get socities:', error);

    return [];
  }
};

export const registerSociety = async (
  societyDetails: SocietyTypes.SocietyRegisterDTO,
  loginToken: string,
) => {
  try {
    const response = await client.post(
      '/society/secured/register',
      {
        ...societyDetails,
      },
      {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      },
    );
    console.log(response);
    if (response?.data) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error : ', error);

    return null;
  }
};
