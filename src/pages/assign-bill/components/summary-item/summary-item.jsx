import React from "react";
import { GridColumn, GridRow } from "semantic-ui-react";

const SummaryItem = ({ text, value }) => {
  return (
    <GridRow columns={2} className="pb-0 pt-2">
      <GridColumn>{text}</GridColumn>
      <GridColumn textAlign="right">{value.toLocaleString()}</GridColumn>
    </GridRow>
  );
};

export default SummaryItem;
