import React, { useState } from "react";
import { Divider, Grid, GridColumn, GridRow, Input } from "semantic-ui-react";

const Summary = ({ subtotal = 0 }) => {
  const [tax, setTax] = useState(0);
  const [service, setService] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  const onBlur = () => {};

  const others = Number(total) - (subtotal + Number(tax) + Number(service) - Number(discount))

  return (
    <Grid>
      <GridRow columns={2} verticalAlign="middle" className="pb-0">
        <GridColumn>Subtotal</GridColumn>
        <GridColumn>{subtotal.toLocaleString()}</GridColumn>
      </GridRow>
      <GridRow columns={2} verticalAlign="middle" className="pb-0">
        <GridColumn>Tax</GridColumn>
        <GridColumn>
          <Input
            value={tax}
            fluid
            placeholder="0"
            onChange={(_, { value }) => setTax(value)}
            onBlur={() => onBlur()}
          />
        </GridColumn>
      </GridRow>
      <GridRow columns={2} verticalAlign="middle" className="pb-0">
        <GridColumn>Service Charge</GridColumn>
        <GridColumn>
          <Input
            value={service}
            fluid
            placeholder="0"
            onChange={(_, { value }) => setService(value)}
            onBlur={() => onBlur()}
          />
        </GridColumn>
      </GridRow>
      <GridRow columns={2} verticalAlign="middle" className="pb-0">
        <GridColumn>Discount</GridColumn>
        <GridColumn>
          <Input
            value={discount}
            fluid
            placeholder="0"
            onChange={(_, { value }) => setDiscount(value)}
            onBlur={() => onBlur()}
          />
        </GridColumn>
      </GridRow>
      <GridRow columns={2} verticalAlign="middle" className="pb-0">
        <GridColumn>Others</GridColumn>
        <GridColumn>{others.toLocaleString()}</GridColumn>
      </GridRow>
      <GridRow columns={2} verticalAlign="middle" className="pb-0">
        <GridColumn>Total</GridColumn>
        <GridColumn>
          <Input
            value={total}
            fluid
            placeholder="0"
            onChange={(_, { value }) => setTotal(value)}
            onBlur={() => onBlur()}
          />
        </GridColumn>
      </GridRow>
      <Divider />
    </Grid>
  );
};

export default Summary;
