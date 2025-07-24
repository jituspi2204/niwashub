import { AxiosError } from 'axios';
import { ApiTypes, UserTypes } from '../types';
import client from './client';

const defaultMessage: string = 'Somenthing went wrong, try after sometime';

export const loginUserThroughPhonePassword = async (
  phoneNumber: string,
  password: string,
): Promise<ApiTypes.ApiResponse> => {
  try {
    const response = await client.post(
      '/auth/login',
      {
        phone_number: phoneNumber,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return { data: response.data.data, error: null };
  } catch (error) {
    let err = error as AxiosError;
    console.log('error', err.response);
    return {
      data: null,
      error: err.response?.data?.messsage || defaultMessage,
    };
  }
};

export const sendOtpForVerification = async (
  phoneNumber: string,
  otpFor: 'REGISTER' | 'FORGOT_PASSWORD',
): Promise<ApiTypes.ApiResponse> => {
  try {
    const response = await client.post(
      '/auth/generate-otp',
      {
        phone_number: phoneNumber,
        otp_for: otpFor,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return { data: true, error: null };
  } catch (error) {
    let err = error as AxiosError;
    return {
      data: null,
      error: err.response?.data?.messsage || defaultMessage,
    };
  }
};

export const verifyOtp = async (
  phoneNumber: string,
  otp: string,
  otpFor: 'REGISTER' | 'FORGOT_PASSWORD',
): Promise<ApiTypes.ApiResponse> => {
  try {
    const response = await client.post(
      '/auth/verify-otp',
      {
        phone_number: phoneNumber,
        otp,
        otp_for: otpFor,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return { data: response.data.data.token, error: null };
  } catch (error) {
    let err = error as AxiosError;
    return {
      data: null,
      error: err.response?.data?.messsage || defaultMessage,
    };
  }
};

export const registerUser = async (
  userDetails: UserTypes.UserRegisterForm,
  token: string,
): Promise<ApiTypes.ApiResponse> => {
  console.log('data :', userDetails, token);

  try {
    const response = await client.post(
      '/auth/register',
      {
        name: userDetails.name,
        password: userDetails.password,
        email: userDetails.email,
        token,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return { data: response.data.data, error: null };
  } catch (error) {
    let err = error as AxiosError;
    console.log('error', err.response);
    return {
      data: null,
      error: err.response?.data?.messsage || defaultMessage,
    };
  }
};

export const changeUserPassword = async (
  newPassword: string,
  token: string,
): Promise<ApiTypes.ApiResponse> => {
  try {
    const response = await client.post('/auth/change-password', {
      change_password_token: token,
      new_password: newPassword,
    });
    return { data: true, error: null };
  } catch (error) {
    let err = error as AxiosError;
    return {
      data: null,
      error: err.response?.data?.messsage || defaultMessage,
    };
  }
};
