import { useState } from 'react';

const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return { value, onChange: handleChange };
};

export default useInput;
