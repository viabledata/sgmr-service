import { apiUrl } from 'config';

export const LOGOUT_URL = `${apiUrl}/logout`;
export const LOGIN_URL = `${apiUrl}/login`;
export const USER_URL = `${apiUrl}/user`;
export const USER_VOYAGE_REPORT_URL = `${apiUrl}/user/voyagereport`;
export const PASSWORD_RESET_LINK = `${apiUrl}/password-reset-link`;
export const PASSWORD_RESET_CONFIRMATION = `${apiUrl}/password-reset-confirmation`;
export const VOYAGE_REPORT_URL = `${apiUrl}/voyagereport`;
export const PEOPLE_URL = `${apiUrl}/user/people`;
export const VESSELS_URL = `${apiUrl}/user/vessels`;
export const SUBMIT_VERIFICATION_CODE_URL = `${apiUrl}/submit-verification-code`;
export const RESEND_VERIFICATION_CODE_URL = `${apiUrl}/resend-verification-code`;
export const REGISTRATION_URL = `${apiUrl}/registration`;

export const VOYAGE_STATUSES = {
  CANCELLED: 'Cancelled',
  DRAFT: 'Draft',
  FAILED: 'Failed',
  PRE_CANCELLED: 'PreCancelled',
  PRE_SUBMITTED: 'PreSubmitted',
  SUBMITTED: 'Submitted',
};
