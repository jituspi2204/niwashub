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

export const fetchBlockAndFlatsForSociety = async (societyId: string) => {
  try {
    const response = await client.get(`/flat/public/flat-list/${societyId}`);
    if (response?.data) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
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
