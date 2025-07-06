import { bootstrapTypes } from '../types';
import client from './client';

const homeCategories: bootstrapTypes.HomeServicesList[] = [
  {
    id: 1,
    name: 'Members',
    image: '',
    link: 'Members',
  },
  {
    id: 1,
    name: 'Visitors',
    image: '',
    link: 'Visitors',
  },
  {
    id: 1,
    name: 'Maintenances',
    image: '',
    link: 'Maintenances',
  },
  {
    id: 1,
    name: 'Complaints',
    image: '',
    link: 'Complaints',
  },
  {
    id: 1,
    name: 'Notice Board',
    image: '',
    link: 'NoticeBoard',
  },
];

export const loadAppStartupData = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    homeCategories: homeCategories,
  };
};

export const getStates = async () => {
  try {
    const response = await client.get('/utils/states');
    if (response?.data) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
export const getCitiesForState = async (state:string) => {
  try {
    const response = await client.get(`/utils/cities/${state}`);
    if (response?.data) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};