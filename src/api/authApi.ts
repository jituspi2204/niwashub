import { UserTypes } from '../types';
import client from './client';

export const loginUserThroughPhonePassword = async (
  phoneNumber: string,
  password: string,
) => {
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
    if (response?.data?.success) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error:', error);

    return null;
  }
};

export const sendOtpForVerification = async (
  phoneNumber: string,
  otpFor: 'REGISTER' | 'FORGOT_PASSWORD',
) => {
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
    console.log('res:', response);

    if (response?.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('error:', error);

    return false;
  }
};

export const verifyOtp = async (
  phoneNumber: string,
  otp: string,
  otpFor: 'REGISTER' | 'FORGOT_PASSWORD',
) => {
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
    if (response?.data) {
      return response.data.data.token;
    } else {
      return '';
    }
  } catch (error) {
    return '';
  }
};

export const registerUser = async (
  userDetails: UserTypes.UserRegisterForm,
  token: string,
) => {
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
    console.log('res:', response);
    if (response?.data) {
      return response.data.data;
    } else {
      return '';
    }
  } catch (error) {
    console.log('error:', error);

    return '';
  }
};
