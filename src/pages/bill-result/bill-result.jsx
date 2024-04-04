import React from "react";
import { Divider, Grid, GridColumn, GridRow, Header, List, ListContent, ListDescription, ListHeader, ListItem } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import './bill-result.css'

const BillResult = () => {
  const { total } = JSON.parse(localStorage.getItem('summary')) || { total: 0 };
  const data = JSON.parse(localStorage.getItem('result')) || []

  return (
    <>
      <Header className="fs-20">Total: Rp{total.toLocaleString()}</Header>
      <List>
        {data.map(item => (
          <ListItem key={item.assignee}>
            <ListContent>
              <ListHeader className="mt-2 mb-4 fs-16">{item.assignee} : Rp{item.total.toLocaleString()}</ListHeader>
              <ListDescription>
                <Grid>
                  {item.menus.map(menu => (
                    <GridRow key={menu.id} columns={3} className="bill-result-menu pt-1">
                      <GridColumn width={8}>{menu.name}</GridColumn>
                      <GridColumn width={4}>x {menu.quantity}</GridColumn>
                      <GridColumn width={4} textAlign="right">{Number(menu.price).toLocaleString()}</GridColumn>
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
