import { UtilTypes } from '../types';
export type ErrorType = {
  AUTH_001: UtilTypes.Error;
  AUTH_002: UtilTypes.Error;
  AUTH_003: UtilTypes.Error;
  AUTH_004: UtilTypes.Error;
  AUTH_005: UtilTypes.Error;

  USER_001: UtilTypes.Error;
  USER_002: UtilTypes.Error;
  USER_003: UtilTypes.Error;

  FLAT_001: UtilTypes.Error;
  FLAT_002: UtilTypes.Error;
  RESIDENT_001: UtilTypes.Error;

  GUARD_001: UtilTypes.Error;

  VISITOR_001: UtilTypes.Error;
  VISITOR_002: UtilTypes.Error;

  MAINT_001: UtilTypes.Error;
  MAINT_002: UtilTypes.Error;

  COMPL_001: UtilTypes.Error;
  COMPL_002: UtilTypes.Error;

  EVENT_001: UtilTypes.Error;

  PAY_001: UtilTypes.Error;
  PAY_002: UtilTypes.Error;

  DEL_001: UtilTypes.Error;

  NOTIF_001: UtilTypes.Error;

  SYS_001: UtilTypes.Error;
  SYS_002: UtilTypes.Error;

  COMMON_001: UtilTypes.Error;
  COMMON_002: UtilTypes.Error;

  VALID_001: UtilTypes.Error;
  VALID_002: UtilTypes.Error;
  VALID_003: UtilTypes.Error;
  VALID_004: UtilTypes.Error;
  VALID_005: UtilTypes.Error;
  VALID_006: UtilTypes.Error;
  VALID_007: UtilTypes.Error;
  VALID_008: UtilTypes.Error;
  VALID_009: UtilTypes.Error;
  VALID_010: UtilTypes.Error;
  VALID_011: UtilTypes.Error;
  VALID_012: UtilTypes.Error;
  VALID_013: UtilTypes.Error;
  VALID_014: UtilTypes.Error;
  VALID_015: UtilTypes.Error;
  VALID_016: UtilTypes.Error;
  VALID_017: UtilTypes.Error;
  VALID_018: UtilTypes.Error;
  VALID_019: UtilTypes.Error;

  FRONT_001: UtilTypes.Error;
  FRONT_002: UtilTypes.Error;
  FRONT_003: UtilTypes.Error;
  FRONT_004: UtilTypes.Error;
  FRONT_005: UtilTypes.Error;
  FRONT_006: UtilTypes.Error;
  FRONT_007: UtilTypes.Error;
  FRONT_008: UtilTypes.Error;
  FRONT_009: UtilTypes.Error;
  FRONT_010: UtilTypes.Error;
};

export const Errors: ErrorType = {
  AUTH_001: {
    id: 'AUTH_INVALID_CREDENTIALS',
    message: 'Invalid username or password',
  },
  AUTH_002: { id: 'AUTH_UNAUTHORIZED', message: 'Unauthorized access' },
  AUTH_003: {
    id: 'AUTH_TOKEN_EXPIRED',
    message: 'Authentication token expired',
  },
  AUTH_004: {
    id: 'AUTH_TOKEN_INVALID',
    message: 'Invalid authentication token',
  },
  AUTH_005: {
    id: 'AUTH_ACCESS_DENIED',
    message: 'Access denied for this role',
  },

  USER_001: { id: 'USER_NOT_FOUND', message: 'User not found' },
  USER_002: { id: 'USER_ALREADY_EXISTS', message: 'User already exists' },
  USER_003: {
    id: 'USER_PROFILE_INCOMPLETE',
    message: 'User profile is incomplete',
  },

  FLAT_001: { id: 'FLAT_NOT_FOUND', message: 'Flat not found' },
  FLAT_002: {
    id: 'FLAT_ALREADY_ASSIGNED',
    message: 'Flat already assigned to a resident',
  },
  RESIDENT_001: { id: 'RESIDENT_NOT_FOUND', message: 'Resident not found' },

  GUARD_001: { id: 'GUARD_NOT_FOUND', message: 'Guard not found' },

  VISITOR_001: { id: 'VISITOR_NOT_FOUND', message: 'Visitor not found' },
  VISITOR_002: {
    id: 'VISITOR_ENTRY_EXISTS',
    message: 'Visitor entry already exists',
  },

  MAINT_001: {
    id: 'MAINTENANCE_REQUEST_NOT_FOUND',
    message: 'Maintenance request not found',
  },
  MAINT_002: {
    id: 'MAINTENANCE_PAYMENT_FAILED',
    message: 'Maintenance payment failed',
  },

  COMPL_001: { id: 'COMPLAINT_NOT_FOUND', message: 'Complaint not found' },
  COMPL_002: {
    id: 'COMPLAINT_ALREADY_RESOLVED',
    message: 'Complaint already resolved',
  },

  EVENT_001: { id: 'EVENT_NOT_FOUND', message: 'Event not found' },

  PAY_001: { id: 'PAYMENT_FAILED', message: 'Payment processing failed' },
  PAY_002: {
    id: 'PAYMENT_RECORD_NOT_FOUND',
    message: 'Payment record not found',
  },

  DEL_001: { id: 'DELIVERY_NOT_FOUND', message: 'Delivery not found' },

  NOTIF_001: {
    id: 'NOTIFICATION_NOT_FOUND',
    message: 'Notification not found',
  },

  SYS_001: {
    id: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
  },
  SYS_002: {
    id: 'SERVICE_UNAVAILABLE',
    message: 'Service temporarily unavailable',
  },

  COMMON_001: {
    id: 'RESOURCE_NOT_FOUND',
    message: 'Requested resource not found',
  },
  COMMON_002: { id: 'OPERATION_NOT_ALLOWED', message: 'Operation not allowed' },

  VALID_001: { id: 'INVALID_INPUT', message: 'Invalid input provided' },
  VALID_002: {
    id: 'MISSING_REQUIRED_FIELD',
    message: 'Missing required field',
  },
  VALID_003: { id: 'INVALID_EMAIL_FORMAT', message: 'Email format is invalid' },
  VALID_004: {
    id: 'INVALID_PHONE_NUMBER',
    message: 'Phone number must be 10 digits',
  },
  VALID_005: {
    id: 'INVALID_PASSWORD',
    message: 'Password does not meet security criteria',
  },
  VALID_006: {
    id: 'INVALID_ENUM_VALUE',
    message: 'Invalid value for enum field',
  },
  VALID_007: { id: 'FIELD_TOO_SHORT', message: 'Field value is too short' },
  VALID_008: { id: 'FIELD_TOO_LONG', message: 'Field value is too long' },
  VALID_009: { id: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' },
  VALID_010: {
    id: 'INVALID_NUMBER_FORMAT',
    message: 'Number format is invalid',
  },
  VALID_011: {
    id: 'VALUE_OUT_OF_RANGE',
    message: 'Value is out of allowed range',
  },
  VALID_012: { id: 'DUPLICATE_ENTRY', message: 'Duplicate value not allowed' },
  VALID_013: { id: 'INVALID_ROLE', message: 'Specified role is not supported' },
  VALID_014: {
    id: 'UNSUPPORTED_FILE_TYPE',
    message: 'File type not supported',
  },
  VALID_015: {
    id: 'FILE_SIZE_EXCEEDED',
    message: 'File size exceeds allowed limit',
  },
  VALID_016: { id: 'MALFORMED_JSON', message: 'Malformed JSON body' },
  VALID_017: {
    id: 'EMPTY_REQUEST_BODY',
    message: 'Request body must not be empty',
  },
  VALID_018: {
    id: 'RESOURCE_ALREADY_EXISTS',
    message: 'Resource already exists',
  },
  VALID_019: { id: 'BAD_REQUEST', message: 'Invalid data fields' },

  FRONT_001: { id: 'PASSWORD_MISMATCH', message: 'Passwords do not match' },
  FRONT_002: {
    id: 'EMPTY_FORM_FIELD',
    message: 'Please fill out all required fields',
  },
  FRONT_003: {
    id: 'INVALID_PHONE_FORMAT',
    message: 'Please enter a valid 10-digit phone number',
  },
  FRONT_004: {
    id: 'EMAIL_ALREADY_REGISTERED',
    message: 'This email is already registered',
  },
  FRONT_005: {
    id: 'TERMS_NOT_ACCEPTED',
    message: 'You must accept the terms and conditions',
  },
  FRONT_006: { id: 'NO_FLAT_SELECTED', message: 'Please select your flat' },
  FRONT_007: { id: 'PHOTO_NOT_UPLOADED', message: 'Please upload a photo' },
  FRONT_008: { id: 'OTP_INVALID', message: 'The entered OTP is incorrect' },
  FRONT_009: {
    id: 'OTP_EXPIRED',
    message: 'The OTP has expired, please request a new one',
  },
  FRONT_010: {
    id: 'INVALID_FILE_FORMAT',
    message: 'Uploaded file format is not allowed',
  },
};
