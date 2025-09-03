import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue(defaultValue);
  };

  return [value, onValueChangeHandler, reset];
}

export default useInput;