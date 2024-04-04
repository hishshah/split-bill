import React from "react";
import {
  Grid,
  GridColumn,
  GridRow,
  Label,
  ListContent,
  ListDescription,
  ListHeader,
  ListItem,
} from "semantic-ui-react";
import "./menu-item.css";

const MenuItem = ({ item, isSelected, handleClick, updateAssigneeQty }) => {
  const editAssignee = (e, assignee) => {
    e.stopPropagation()

    const quantity = Number(prompt("Quantity:", assignee.quantity));

    if (quantity) {
      updateAssigneeQty(item.id, assignee.name, quantity)
    }
  };

  return (
    <div
      className="menu-item"
      data-selected={isSelected}
      onClick={() => handleClick(item.id, isSelected)}
    >
      <ListItem>
        <ListContent>
          <ListHeader className="font-weight-bold">{item.name}</ListHeader>
          <ListDescription>
            <Grid>
              <GridRow verticalAlign="middle">
                <GridColumn width={4}>x {item.quantity}</GridColumn>
                <GridColumn width={4}>
                  {Number(item.price).toLocaleString()}
                </GridColumn>
                <GridColumn width={8}>
                  {item.assignees.map((assignee) => (
                    <Label
                      as="button"
                      key={`${assignee.name}-${assignee.quantity}-${new Date().getTime()}`}
                      circular
                      color={assignee.color}
                      content={assignee.quantity}
                      className="ml-0 mr-1 mb-1"
                      onClick={(e) => editAssignee(e, assignee)}
                    />
                  ))}
                </GridColumn>
              </GridRow>
            </Grid>
          </ListDescription>
        </ListContent>
      </ListItem>
    </div>
  );
};

export default MenuItem;
