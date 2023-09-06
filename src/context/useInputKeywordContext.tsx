import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type InputKeywordContextType = {
  inputKeyword: string;
  setInputKeyword: Dispatch<SetStateAction<string>>;
};

const InputKeywordContext = createContext<InputKeywordContextType>({
  inputKeyword: '',
  setInputKeyword: () => {},
});

type InputKeywordProviderProps = {
  children: ReactNode;
};

export function useInputKeywordContext() {
  return useContext(InputKeywordContext);
}

export function InputKeywordProvider({ children }: InputKeywordProviderProps) {
  const [inputKeyword, setInputKeyword] = useState('');

  return (
    <InputKeywordContext.Provider value={{ inputKeyword, setInputKeyword }}>
      {children}
    </InputKeywordContext.Provider>
  );
}
