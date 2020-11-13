export const ERRORS = {
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
  RATE_LIMIT_EXCEEDED: 'rate limit exceeded',
  NOT_MODIFIED: 'Not Modified',
  FORBIDDEN: 'Forbidden',
  SERVICE_UNAVAILABLE: 'Service Unavailable',
  NOT_FOUND: 'Not Found',

  messageToEnum: {
    'Unprocessable Entity': 'UNPROCESSABLE_ENTITY',
    'rate limit exceeded': 'RATE_LIMIT_EXCEEDED',
    'Not Modified': 'NOT_MODIFIED',
    Forbidden: 'FORBIDDEN',
    'Service Unavailable': 'SERVICE_UNAVAILABLE',
    'Not Found': 'NOT_FOUND',
  },

  mapCustomErrorCode: {
    UNPROCESSABLE_ENTITY: 422,
    RATE_LIMIT_EXCEEDED: 403,
    NOT_MODIFIED: 304,
    FORBIDDEN: 403,
    SERVICE_UNAVAILABLE: 503,
    NOT_FOUND: 404,
  },

  customErrorMessage: {
    UNPROCESSABLE_ENTITY: '請輸入正確的關鍵字搜尋',
    RATE_LIMIT_EXCEEDED: '搜尋次數超過 Rate limit，請稍後再試',
    SERVER_ERROR: '發生錯誤，請稍後再試',
  },
};
