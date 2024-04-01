import React, { useState } from "react";
import Item from "./components/item";
import { Button, Divider, Grid, GridColumn, GridRow, Icon } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import Summary from "./components/edit-summary";

const EditBill = () => {
  const defaultItem = {
    name: "",
    quantity: 1,
    price: 0,
  };
  const [items, setItems] = useState([
    {
      id: uuid(),
      ...defaultItem,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: uuid(),
        ...defaultItem,
      },
    ]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id, data) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, ...data };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const subtotal = items.reduce((total, { price }) => {
    return total + Number(price);
  }, 0);

  return (
    <>
      <Button icon labelPosition="left" onClick={addItem} className="mb-3">
        <Icon name="add" />
        Add Item
      </Button>

      <Grid>
        {items.map((item, i) => (
          <GridRow key={item.id}>
            <GridColumn width={14} className="pr-0">
              <Item
                defaultData={item}
                callback={(data) => updateItem(item.id, data)}
              />
            </GridColumn>
            {items.length > 1 && (
              <GridColumn width={2}>
                <Button size="mini" icon onClick={() => removeItem(item.id)}>
                  <Icon name="trash alternate outline" />
                </Button>
              </GridColumn>
            )}
          </GridRow>
        ))}
      </Grid>

      <Divider />
      <Summary subtotal={subtotal} />

      <Button fluid color="green" className="mt-4">
        Confirm Bill
      </Button>
    </>
  );
};

export default EditBill;
