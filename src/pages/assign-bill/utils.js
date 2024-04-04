export default class AssignBillUtils {
  constructor(menuItems, summary) {
    this.menuItems = menuItems;
    this.summary = summary;
  }

  getItemsByAssignee(assignee) {
    return this.menuItems
      .map((item) => {
        const assigneeForMenu = item.assignees.find(
          (ass) => ass.name === assignee
        );
        if (!assigneeForMenu) return null;

        const { id, name, price, quantity } = item;
        const pricePerItem = Number(price) / Number(quantity);
        const assigneeQuantity = Number(assigneeForMenu.quantity);
        return {
          id,
          name,
          price: Math.ceil(pricePerItem * assigneeQuantity),
          quantity: assigneeQuantity,
        };
      })
      .filter(Boolean);
  }

  getAdditionals(menus) {
    const subtotal = this.calculateSubtotal(menus);
    const additionals = {};
    const {
      taxPercentage,
      servicePercentage,
      othersPercentage,
      discountPercentage,
    } = this.summary;

    if (taxPercentage)
      additionals.tax = { label: "Tax", amount: taxPercentage * subtotal };

    if (servicePercentage)
      additionals.service = {
        label: "Service Charge",
        amount: servicePercentage * subtotal,
      };

    if (discountPercentage)
      additionals.discount = {
        label: "Discount",
        amount: discountPercentage * subtotal,
      };

    if (othersPercentage)
      additionals.others = {
        label: "Others",
        amount: othersPercentage * subtotal,
      };

    return additionals;
  }

  calculateSubtotal(menus) {
    const subtotal = menus.reduce((total, { price }) => {
      return total + Number(price);
    }, 0);
    return subtotal;
  }

  calculateTotal(menus, additionals) {
    let total = 0;
    total += this.calculateSubtotal(menus);
    Object.keys(additionals).forEach((key) => {
      const additional = additionals[key];
      total += additional["amount"];
    });

    return total;
  }
}
