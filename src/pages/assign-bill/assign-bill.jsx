import React, { useState } from "react";
import {
  Button,
  Grid,
  GridColumn,
  GridRow,
  List,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "./assign-bill.css";
import MenuItem from "./components/menu-item";
import SummaryItem from "./components/summary-item";
import AssignBillUtils from "./utils";

const AssignBill = () => {
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [assignees, setAssignees] = useState([]);
  const defaultMenuItems = JSON.parse(localStorage.getItem('menuItems')) || []
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
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
  const maxAssignee = 11;
  const summary = JSON.parse(localStorage.getItem('summary')) || {
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
  const { subtotal, tax, service, discount, others, total } = summary;
  const navigate = useNavigate()

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
          updatedAssignee.push({...selectedAssignee});
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

      const newAssignee = {
        name,
        color,
        quantity: 1
      }
      setAssignees([
        ...assignees,
        newAssignee
      ]);
      if (!selectedAssignee) {
        setSelectedAssignee(newAssignee)
      }
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

  const calculateBill = () => {
    const utils = new AssignBillUtils(menuItems, summary);
    const result = assignees.map(assignee => {
      const menus = utils.getItemsByAssignee(assignee.name)
      const additionals = utils.getAdditionals(menus)
      const total = utils.calculateTotal(menus, additionals)
      return {
        assignee: assignee.name,
        menus,
        total,
        additionals
      }
    })

    localStorage.setItem('result', JSON.stringify(result))
    navigate('/result')
  }

  const updateAssigneeQty = (id, assignee, quantity) => {
    const updatedMenuItems = menuItems.map((item) => {
      if (item.id === id) {
        const updatedAssignee = item.assignees.map(ass => {
          if (ass.name === assignee) {
            ass.quantity = Math.min(quantity, item.quantity)
          }
          return ass
        })

        return { ...item, assignees: updatedAssignee };
      }
      return item;
    });

    setMenuItems(updatedMenuItems);
  };

  return (
    <>
      {assignees.map((assignee) => {
        const isSelected = assignee.name === selectedAssignee?.name;

        return (
          <Button
            key={assignee.name}
            icon
            color={assignee.color}
            onClick={() => setSelectedAssignee(assignee)}
            className="assignee mr-2"
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
              updateAssigneeQty={updateAssigneeQty}
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
            <Button fluid color="green" onClick={() => calculateBill()} disabled={assignees.length === 0}>
              Split Bill
            </Button>
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  );
};

export default AssignBill;
