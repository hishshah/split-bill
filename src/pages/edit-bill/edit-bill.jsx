import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from "./components/item";
import { Button, Divider, Grid, GridColumn, GridRow, Icon } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import Summary from "./components/edit-summary";

const EditBill = () => {
  const defaultSummary = JSON.parse(localStorage.getItem('summary')) || {
    subtotal: 0,
    tax: 0,
    taxPercentage: 0,
    service: 0,
    servicePercentage: 0,
    discount: 0,
    discountPercentage: 0,
    others: 0,
    othersPercentage: 0,
    total: 0,
  }
  const [summary, setSummary] = useState(defaultSummary)

  const defaultItem = {
    name: "",
    quantity: 1,
    price: 0,
  };
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('menuItems')) || [
    {
      id: uuid(),
      ...defaultItem,
    },
  ]);

  const navigate = useNavigate()

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

  const confirmBill = () => {
    const finalItems = items.filter(item => !!item.name).map(item => ({...item, assignees: []}))
    if (finalItems.length === 0 || subtotal === 0) return alert('Please add item and price')

    const tax = Number(summary.tax)
    const service = Number(summary.service)
    const discount = Number(summary.discount)
    const total = Number(summary.total)
    const others = total - (subtotal + tax + service + discount)
    const finalSummary = {
      subtotal,
      tax,
      taxPercentage: tax / subtotal,
      service,
      servicePercentage: service / subtotal,
      discount,
      discountPercentage: discount / subtotal,
      others,
      othersPercentage: others / subtotal,
      total,
    }

    localStorage.setItem('menuItems', JSON.stringify(finalItems))
    localStorage.setItem('summary', JSON.stringify(finalSummary))

    navigate('/assign')
  }

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
      <Summary defaultData={summary} subtotal={subtotal} callback={(data) => setSummary(...summary, ...data)} />

      <Button fluid color="green" className="mt-4" onClick={() => confirmBill()}>
        Confirm Bill
      </Button>
    </>
  );
};

export default EditBill;
