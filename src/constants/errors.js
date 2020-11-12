export const ERRORS = {
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
  RATE_LIMIT_EXCEEDED: 'rate limit exceeded',

  messageToEnum: {
    'Unprocessable Entity': 'UNPROCESSABLE_ENTITY',
    'rate limit exceeded': 'RATE_LIMIT_EXCEEDED',
  },

  mapCustomErrorCode: {
    UNPROCESSABLE_ENTITY: 422,
    RATE_LIMIT_EXCEEDED: 403,
  },

  customErrorMessage: {
    UNPROCESSABLE_ENTITY: '請輸入正確的關鍵字搜尋。',
    RATE_LIMIT_EXCEEDED: '抱歉搜尋次數超過 Rate limit 了，請稍等一下再試試看。',
    UNKNOWN: '抱歉發生預期外的錯誤。',
  },
};
