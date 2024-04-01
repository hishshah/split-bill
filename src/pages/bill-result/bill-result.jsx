import React from "react";
import { Divider, Grid, GridColumn, GridRow, Header, List, ListContent, ListDescription, ListHeader, ListItem } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import './bill-result.css'

const BillResult = () => {
  const total = 200000;
  const data = [
    {
      assignee: 'John Doe',
      total: 20000,
      menus: [
        {
          id: uuid(),
          name: 'Pecel',
          quantity: 2,
          price: 10000
        },
        {
          id: uuid(),
          name: 'Nasi',
          quantity: 1,
          price: 10000
        }
      ],
      additionals: {
        tax: { label: 'Tax', amount: 10000 },
        service: { label: 'Service Charge', amount: 10000 },
        discount: { label: 'Discount', amount: -10000 },
        others: { label: 'Others', amount: -10000 },
      }
    },
    {
      assignee: 'John Doe',
      total: 20000,
      menus: [
        {
          id: uuid(),
          name: 'Pecel',
          quantity: 2,
          price: 10000
        },
        {
          id: uuid(),
          name: 'Nasi',
          quantity: 1,
          price: 100000
        }
      ],
      additionals: {
        tax: { label: 'Tax', amount: 10000 },
        service: { label: 'Service Charge', amount: 10000 },
        discount: { label: 'Discount', amount: -10000 },
        others: { label: 'Others', amount: -10000 },
      }
    }
  ]

  return (
    <>
      <Header className="fs-20">Total: Rp{total.toLocaleString()}</Header>
      <List>
        {data.map(item => (
          <ListItem>
            <ListContent>
              <ListHeader className="mt-2 mb-4 fs-16">{item.assignee} : Rp{item.total.toLocaleString()}</ListHeader>
              <ListDescription>
                <Grid>
                  {item.menus.map(menu => (
                    <GridRow key={menu.id} columns={3} className="bill-result-menu pt-1">
                      <GridColumn width={8}>{menu.name}</GridColumn>
                      <GridColumn width={4}>x {menu.quantity}</GridColumn>
                      <GridColumn width={4} textAlign="right">{menu.price.toLocaleString()}</GridColumn>
                    </GridRow>
                  ))}
                  <Divider className="border-top-dashed my-2" />
                  {Object.keys(item.additionals).map(key => {
                    const additionalItem = item.additionals[key]
                    return <GridRow key={uuid()} columns={3} className="bill-result-menu pt-1">
                      <GridColumn width={8}>{additionalItem.label}</GridColumn>
                      <GridColumn width={8} textAlign="right">{additionalItem.amount.toLocaleString()}</GridColumn>
                    </GridRow>
                  })}
                </Grid>
                <Divider />
              </ListDescription>
            </ListContent>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default BillResult;
