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
import './menu-item.css'

const MenuItem = ({ item, isSelected, handleClick }) => {
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
                <GridColumn width={4}>{Number(item.price).toLocaleString()}</GridColumn>
                <GridColumn width={8}>{item.assignees.map(assignee => (
                  <Label key={assignee.name} circular color={assignee.color} />
                ))}</GridColumn>
              </GridRow>
            </Grid>
          </ListDescription>
        </ListContent>
      </ListItem>
    </div>
  );
};

export default MenuItem;
