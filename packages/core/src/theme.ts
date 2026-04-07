export interface InkUITheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    muted: string;
    text: string;
    textInverse: string;
    border: string;
    focus: string;
    selection: string;
  };
  border: 'single' | 'double' | 'rounded' | 'bold' | 'ascii';
}

export const darkTheme: InkUITheme = {
  colors: {
    primary: 'cyan',
    secondary: 'magenta',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',
    muted: 'gray',
    text: 'white',
    textInverse: 'black',
    border: 'gray',
    focus: 'cyan',
    selection: 'blue',
  },
  border: 'single',
};

export const lightTheme: InkUITheme = {
  colors: {
    primary: 'blue',
    secondary: 'magenta',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'cyan',
    muted: 'gray',
    text: 'black',
    textInverse: 'white',
    border: 'gray',
    focus: 'blue',
    selection: 'cyan',
  },
  border: 'rounded',
};
