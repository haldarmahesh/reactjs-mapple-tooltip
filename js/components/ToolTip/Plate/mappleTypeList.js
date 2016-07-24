export default function List(backgroundColor, textColor) {
    return {
      default: {
        backgroundColor: backgroundColor,
        textColor: textColor
      },
      success: {
        backgroundColor: '#DFF2BF',
        textColor: '#5B931F'
      },
      warning: {
        backgroundColor: '#FEEFB3',
        textColor: '#9F6000'
      },
      info: {
        backgroundColor: '#BDE5F8',
        textColor: '#00529B'
      },
      error: {
        backgroundColor: '#FFBABA',
        textColor: '#DA0B16'
      }
    };
}

export function typeList() {
    return Object.keys(List());
}