export const spacing = {
  none: 0,
  xs: 1,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
} as const;

export const borderStyles = {
  single: {
    topLeft: '┌', top: '─', topRight: '┐',
    left: '│', right: '│',
    bottomLeft: '└', bottom: '─', bottomRight: '┘',
    topT: '┬', bottomT: '┴', leftT: '├', rightT: '┤', cross: '┼',
  },
  double: {
    topLeft: '╔', top: '═', topRight: '╗',
    left: '║', right: '║',
    bottomLeft: '╚', bottom: '═', bottomRight: '╝',
    topT: '╦', bottomT: '╩', leftT: '╠', rightT: '╣', cross: '╬',
  },
  rounded: {
    topLeft: '╭', top: '─', topRight: '╮',
    left: '│', right: '│',
    bottomLeft: '╰', bottom: '─', bottomRight: '╯',
    topT: '┬', bottomT: '┴', leftT: '├', rightT: '┤', cross: '┼',
  },
  bold: {
    topLeft: '┏', top: '━', topRight: '┓',
    left: '┃', right: '┃',
    bottomLeft: '┗', bottom: '━', bottomRight: '┛',
    topT: '┳', bottomT: '┻', leftT: '┣', rightT: '┫', cross: '╋',
  },
  ascii: {
    topLeft: '+', top: '-', topRight: '+',
    left: '|', right: '|',
    bottomLeft: '+', bottom: '-', bottomRight: '+',
    topT: '+', bottomT: '+', leftT: '+', rightT: '+', cross: '+',
  },
} as const;

export type BorderStyle = keyof typeof borderStyles;

export const spinnerFrames = {
  dots:   ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  line:   ['−', '\\', '|', '/'],
  arc:    ['◜', '◠', '◝', '◞', '◡', '◟'],
  bounce: ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
} as const;

export type SpinnerType = keyof typeof spinnerFrames;
