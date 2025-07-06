import client from './client';

export const getUserFlatList = async (loginToken: string) => {
  try {
    const response = await client.get('/flat/secured/all-flats', {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
    console.log('flats: ', response);

    if (response?.data?.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log('user error:', error);
    return [];
  }
};
