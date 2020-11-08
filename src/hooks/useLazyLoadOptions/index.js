import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * 由於選項可能的資料很龐大，因此一開始的選項不要一次就塞入，
 * 使用該 hook 來根據輸入欄搜尋的字串值，來動態載入選項
 * @param handler 當輸入欄變更時，根據輸入值更新可選的選項處理邏輯函式
 * @param waitDuration 輸入欄停止輸入的等待時間，預設 `300ms`
 */
export default function useLazyLoadOptions(handler, waitDuration = 300) {
  const isMounted = useIsMounted();
  const [loading, setLoading] = useState(false);
  const [lazyOptions, setLazyOptions] = useState([]);
  /** 用一個 map 來記錄所有選項的 value 鍵值，用來快速比對選項是否已存在 */
  const optionValueMapRef = useRef({});
  /** 紀錄當前輸入欄的字串值 */
  const inputValueRef = useRef('');
  /** 用一個 map 來記錄 inputValue 有無被執行過，避免重複執行 */
  const executedMapRef = useRef({});
  /** 判斷輸入停止間隔而啟動的計時器 */
  const timerRef = useRef(void 0);
  /** 使用 useRef 避免 handler 因 onChange 的更新而變更 */
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  /**
   * 使用一個序列來紀錄非同步工作\
   * 因為有可能上一個非同步工作尚未結束，而下一次的 handle 已觸發
   */
  const handlePromises = useMemo(() => [], []);

  const watchInputChange = useCallback(
    inputValue => {
      if (typeof handlerRef.current !== 'function') return;
      inputValueRef.current = inputValue;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(async () => {
        timerRef.current = void 0;
        /**
         * 如果當前的輸入欄位值是空的 或 該輸入欄字串值已執行過
         * 則不觸發處理
         */
        if (
          !inputValueRef.current ||
          executedMapRef.current[inputValueRef.current] ||
          typeof handlerRef.current !== 'function'
        ) {
          return;
        }
        if (!loading) setLoading(true);
        executedMapRef.current[inputValueRef.current] = true;
        /** 將目前的非同步工作丟到序列裡，處理完後再將自己移除 */
        const promise = handlerRef.current(inputValueRef.current, lazyOptions);
        handlePromises.push(promise);
        const newLazyOptions = await promise;
        const promiseIdx = handlePromises.findIndex(_promise => _promise === promise);
        handlePromises.splice(promiseIdx, 1);
        /** 有可能載入完 options 後元件已卸載，因此需要判斷有無 mounted 才 setState */
        if (!isMounted()) return;
        setLazyOptions(currentLazyOptions => {
          /** 排除新選項裡重複的 value */
          const _options = newLazyOptions.filter(option => {
            if (optionValueMapRef.current[option.value]) return false;
            return (optionValueMapRef.current[option.value] = true);
          });
          if (_options.length === 0) return currentLazyOptions;
          return currentLazyOptions.concat(_options);
        });
        /** 所有的非同步工作處理完畢才結束 loading */
        if (handlePromises.length === 0) setLoading(false);
      }, waitDuration);
    },
    [lazyOptions, isMounted, loading, waitDuration, handlePromises],
  );
  return [lazyOptions, watchInputChange, loading];
}
/**
 * 取得當前元件是否正在掛載中
 * `null` = 從未掛載
 * `true` = 掛載中
 * `false` = 已卸載
 * @returns 回傳的是 function 這樣才能取得當下的值
 */
const useIsMounted = () => {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return useMemo(() => () => isMountedRef.current, []);
};
