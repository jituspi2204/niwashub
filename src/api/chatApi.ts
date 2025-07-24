import client from './client';

export const chatHistoryForUser = async (
  userId: string,
  pageNo: number,
  loginToken: string,
) => {
  try {
    const response = await client.get(
      `/messages/private/history/${userId}?pageNo=${pageNo}`,
      {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      },
    );
    return { data: response.data.data };
  } catch (error) {
    return { error: error.response.data.message };
  }
};

export const usersSummary = async (loginToken: string) => {
  try {
    const response = await client.get(`/messages/private/chat-summary`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
    return { data: response.data.data };
  } catch (error) {
    return { error: error.response.data.message };
  }
};
