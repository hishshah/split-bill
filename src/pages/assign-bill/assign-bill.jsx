import React, { useState } from "react";
import {
  Button,
  Grid,
  GridColumn,
  GridRow,
  List,
} from "semantic-ui-react";
import "./assign-bill.css";
import MenuItem from "./components/menu-item";
import SummaryItem from "./components/summary-item";

const AssignBill = () => {
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [assignees, setAssignees] = useState([]);
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Menu 1",
      quantity: 1,
      price: 10000,
      assignees: [],
    },
    {
      id: 2,
      name: "Menu 2",
      quantity: 2,
      price: 20000,
      assignees: [],
    },
    {
      id: 3,
      name: "Menu 3",
      quantity: 3,
      price: 300000,
      assignees: [],
    },
  ]);
  const [colors, setColors] = useState([
    "red",
    "olive",
    "yellow",
    "orange",
    "teal",
    "violet",
    "purple",
    "brown",
    "pink",
    "blue",
    "grey",
  ]);
  const maxAssignee = 11

  const toggleMenuAssignee = (id, isSelected) => {
    if (!selectedAssignee) return alert("Add/select assignee first");
    const updatedMenuItems = menuItems.map((item) => {
      if (item.id === id) {
        let updatedAssignee = item.assignees;
        if (isSelected) {
          updatedAssignee = item.assignees.filter(
            (ass) => ass.name !== selectedAssignee?.name
          );
        } else {
          updatedAssignee.push(selectedAssignee);
        }

        return { ...item, assignees: updatedAssignee };
      }
      return item;
    });

    setMenuItems(updatedMenuItems);
  };

  const addAssignee = () => {
    const name = prompt("Add person:");
    if (name) {
      const isNameAdded = assignees.some(
        (ass) => ass.name.toLowerCase() === name.toLowerCase()
      );
      if (isNameAdded) return alert("Name already exist");
      const color = colors.shift();
      setColors(colors);

      setAssignees([
        ...assignees,
        {
          name,
          color,
        },
      ]);
    }
  };

  const removeAssignee = () => {
    const updatedMenuItems = menuItems.map((item) => {
      return {
        ...item,
        assignees: item.assignees.filter(
          (ass) => ass.name !== selectedAssignee?.name
        ),
      };
    });

    setMenuItems(updatedMenuItems);

    const updatedAssignees = assignees.filter(
      (ass) => ass.name !== selectedAssignee?.name
    );
    setAssignees(updatedAssignees);
    setSelectedAssignee(null);
    setColors([selectedAssignee.color, ...colors]);
  };

  const { subtotal, tax, service, discount, others, total } = {
    subtotal: 1000,
    tax: 2000,
    service: 3000,
    discount: -3000,
    others: -1000,
    total: 2000,
  };

  return (
    <>
      {assignees.map((assignee) => {
        const isSelected = assignee.name === selectedAssignee?.name;

        return (
          <Button
            icon
            color={assignee.color}
            onClick={() => setSelectedAssignee(assignee)}
            className="mr-2"
            data-selected={isSelected}
            size="tiny"
            compact
          >
            {assignee.name}
          </Button>
        );
      })}
      {assignees.length < maxAssignee && (
        <Button circular icon="add" onClick={() => addAssignee()} />
      )}
      {!!selectedAssignee?.name && (
        <Button circular icon="minus" onClick={() => removeAssignee()} />
      )}
      <List divided relaxed className="pb-2">
        {menuItems.map((item) => {
          const isSelected = item.assignees.some(
            (ass) => ass.name === selectedAssignee?.name
          );

          return (
            <MenuItem
              key={item.id}
              item={item}
              isSelected={isSelected}
              handleClick={toggleMenuAssignee}
            />
          );
        })}
      </List>

      <Grid>
        <SummaryItem text='Subtotal' value={subtotal} />
        <SummaryItem text='Tax' value={tax} />
        <SummaryItem text='Service Charge' value={service} />
        <SummaryItem text='Discount' value={discount} />
        <SummaryItem text='Others' value={others} />
        
        <GridRow
          columns={2}
          className="pb-0 font-weight-bold fs-18"
        >
          <GridColumn>Total</GridColumn>
          <GridColumn textAlign="right">{total.toLocaleString()}</GridColumn>
        </GridRow>
      </Grid>

      <Grid>
        <GridRow>
          <GridColumn>
            <Button fluid color="green">
              Split Bill
            </Button>
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  );
};

export default AssignBill;
