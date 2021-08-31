export default {
  color: {
    black: "#191c20",
    matteBlack: "#2e2f32",
    green: "#47a447",
    sage: "#c2c2a6",
    pacificBlue: "#00acc1",
  },
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
