import React, { useState } from "react";
import { Grid, GridColumn, GridRow, Input } from "semantic-ui-react";

const Item = ({ defaultData, callback }) => {
  const [name, setName] = useState(defaultData.name);
  const [quantity, setQuantity] = useState(defaultData.quantity);
  const [price, setPrice] = useState(defaultData.price);

  
  const onBlur = () => {
    callback({
      name, quantity, price
    })
  }

  return (
    <div>
      <Input
        value={name}
        fluid
        placeholder="Item name"
        onChange={(_, { value }) => setName(value)}
        className="mb-2"
        onBlur={() => onBlur()}
      />
      <Grid columns={2}>
        <GridRow>
          <GridColumn width={6}>
            <Input
              value={quantity}
              fluid
              placeholder="Quantity"
              onChange={(_, { value }) => setQuantity(value)}
              label={{ basic: true, content: "X" }}
              labelPosition="right"
              onBlur={() => onBlur()}
            />
          </GridColumn>
          <GridColumn width={10}>
            <Input
              value={price}
              fluid
              placeholder="Price"
              onChange={(_, { value }) => setPrice(value)}
              onBlur={() => onBlur()}
            />
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
};

export default Item;
