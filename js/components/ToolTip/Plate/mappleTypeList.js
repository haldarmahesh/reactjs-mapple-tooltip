export default function List(backgroundColor, textColor) {
  return {
    default: {
      backgroundColor,
      textColor
    },
    success: {
      backgroundColor: '#DFF2BF',
      textColor: '#5B931F',
      border: true
    },
    warning: {
      backgroundColor: '#FEEFB3',
      textColor: '#9F6000',
      border: true
    },
    info: {
      backgroundColor: '#BDE5F8',
      textColor: '#00529B',
      border: true
    },
    error: {
      backgroundColor: '#FFBABA',
      textColor: '#DA0B16',
      border: true
    }
  };
}

export function typeList() {
  return Object.keys(List());
}
