import React, { useState } from "react";
import { Divider, Grid, GridColumn, GridRow, Input } from "semantic-ui-react";

const Summary = ({ defaultData, subtotal = 0, callback }) => {
  const [tax, setTax] = useState(defaultData?.tax || 0);
  const [service, setService] = useState(defaultData?.service || 0);
  const [discount, setDiscount] = useState(defaultData?.discount || 0);
  const [total, setTotal] = useState(defaultData?.total || 0);


  const others = Number(total) - (subtotal + Number(tax) + Number(service) + Number(discount))

  const onBlur = () => {
    callback({
      tax, service, discount, total
    })
  };


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
