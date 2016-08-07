export default function list(backgroundColor, textColor) {
  return {
    default: {
      backgroundColor,
      textColor
    },
    ching: {
      backgroundColor: 'black',
      textColor: 'white',
      border: false
    },
    light: {
      backgroundColor: '#eaeaea',
      textColor: '#6E6E6E',
      border: true,
      borderColor: '#bababa'
    },
    contra: {
      backgroundColor: 'white',
      textColor: 'black',
      border: true,
      borderColor: 'black'
    },
    success: {
      backgroundColor: '#DFF2BF',
      textColor: '#5B931F',
      border: true,
      borderColor: '#a2e52e'
    },
    warning: {
      backgroundColor: '#FEEFB3',
      textColor: '#9F6000',
      border: true,
      borderColor: '#dbbd42'
    },
    info: {
      backgroundColor: '#BDE5F8',
      textColor: '#00529B',
      border: true,
      borderColor: '#40a7d6'
    },
    error: {
      backgroundColor: '#FFBABA',
      textColor: '#DA0B16',
      border: true,
      borderColor: '#ff7a7a'
    }
  };
}

export function typeList() {
  return Object.keys(list());
}
