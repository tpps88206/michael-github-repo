import React, { useEffect, useState } from 'react';

const ErrorPage = () => {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMsg(params.get('error'));
  }, []);

  return (
    <div>
      <h1>Error</h1>
      <p>{msg}</p>
    </div>
  );
};

export default ErrorPage;
