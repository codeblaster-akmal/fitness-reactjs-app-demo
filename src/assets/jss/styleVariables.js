export default {
  color: {
    black: "#191c20",
    matteBlack: "#2e2f32",
    green: "#47a447",
    sage: "#c2c2a6",
    pacificBlue: "#00acc1",
    cardBg: 'rgba(46, 47, 50, 0.7)',
    grey: '#777',
    error: "#f44336"
  },
  scrollbar: `
    ::-webkit-scrollbar {
      display: block;
      width: 0.5rem;
    }
    &::-webkit-scrollbar-track {
      display: none;
      box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      border-radius: 2rem;
    } 
  /* Handle */
    &::-webkit-scrollbar-thumb {
      border-radius: 1rem;
      background-color: #777;
    }
    &::-webkit-scrollbar-thumb:window-inactive {
    background-color: rgba(255,0,0,0.4); 
    }`,
  fontStyle: ({
    weight = "400",
    size = "1rem",
    lineHeight = "1",
    family = "Oxanium",
  }) => {
    return `${weight} ${size}/${lineHeight} "${family}"`;
  },
  gridBox: ({
    minCol = "",
    rows = "",
    height = "",
    rowGap = "",
    columGap = "",
  }) => {
    return `display: grid;
            grid-template-column: repeat(auto-fit, minmax(${minCol},1fr));
            grid-template-rows: repeat(${rows}, ${height}) 
            gap: ${rowGap} / ${columGap};
      `;
  },
};
