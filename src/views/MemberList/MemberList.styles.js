import styled from "styled-components";

const ResponsiveTable = styled.ul`
  padding: 0;
  margin: 0.5rem 0;
  .MuiTablePagination-toolbar {
    min-height: 35px;
    border-top: 2px solid #e7ecef;
  }
`;
const TableHeader = styled.li`
  top: 0;
  z-index: 1;
  display: flex;
  position: ${({ position }) => position || 'sticky'};;
  text-align: center;
  align-items: center;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.pacificBlue};
  @media all and (max-width: 767px) {
    display: none;
  }
`;
const Column = styled.div`
  flex-basis: ${({ size }) => (size ? size : "10%")};
  text-align: ${({ alignTo }) => (alignTo ? alignTo : "center")};
  margin: 0 auto;  
  @media all and (max-width: 767px) {
    display: flex;
    padding: 10px 0;
    align-items: center;
    &:before {
      color: ${({ theme }) => theme.color.pacificBlue};
      flex-basis: 40%;
      text-align: left;
      padding-right: 10px;
      content: attr(data-label);
    }
  }
`;
const TableRow = styled.li`
  display: flex;
  padding: 0.3rem 0.5rem;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #fff;

  @media all and (max-width: 767px) {
    display: block;
  }
`;

const TableContainer = styled.div(({ staticHeight = "45vh" }) => {
  return {
    overflowY: "auto",
    height: `calc(100vh - ${staticHeight})`,
  };
});

export {
  Column,
  TableRow,
  TableHeader,
  TableContainer,
  ResponsiveTable,
};
