const read = () => {
  const json = localStorage.getItem('kaban_data');
  if (!json) {
    return [
      { id: 1, items: [] },
      { id: 2, items: [] },
      { id: 3, items: [] },
    ];
  }
  return JSON.parse(json);
};

const save = (data) => {
  localStorage.setItem('kaban_data', JSON.stringify(data));
};

export default class KabanApi {
    static getItems = (columnId) => {
      // console.log(read())
      const column = read().find((column) => column.id === columnId);
      if (!column) {
        return [];
      }
      return column.items;
    }

    static insertItems = (columnId, content) => {
      const data = read();
      // console.log(data)
      const column = data.find((column) => column.id === columnId);
      // verifie if the column exist
      if (!column) {
        throw new Error("The column doesn't exist");
      }
      // we create the item
      const item = {
        id: Math.floor(Math.random() * 100000),
        content,
      };
      column.items.push(item);
      save(data);
      return item;
    }

    static updateItems = (itemId, newProp) => {
      const data = read();
      // should remember this
      const [curentItem, curentColumn] = (() => {
        Object.keys(data).forEach((column) => {
          const item = column.items.find((item) => item.id === itemId);
          if (!item) {
            return [];
          }
          return [item, column];
        });
      })();
      // verify if we really found the the item
      if (!curentItem) {
        // console.log("item doens't exist")
        throw new Error("item doens't exist");
      }
      // console.log(curentItem.content)
      const temp = curentItem.content;
      // if newProp.content is undefined give keep the same value of the item
      curentItem.content = newProp.content === undefined ? temp : newProp.content;
      // console.log(curentItem.content)
      // move a item from a column to another
      if (newProp.columnId !== undefined && newProp.position !== undefined) {
        // get the target column
        const targetColumn = data.find((column) => column.id === newProp.columnId);
        if (!targetColumn) {
          throw new Error('Column not found');
        }
        // delete the item from it original column
        curentColumn.items.splice(curentColumn.items.indexOf(curentItem), 1);
        // add the item in the target column
        targetColumn.items.splice(newProp.position, 0, curentItem);
        // console.log(targetColumn)
      }
      save(data);
    }

    static deleteItems = (itemId) => {
      const data = read();
      Object.keys(data).forEach((column) => {
        const itemTD = column.items.find((item) => item.id === itemId);
        if (itemTD) {
          column.items.splice(column.items.indexOf(itemTD), 1);
        }
      });
      save(data);
    }
}
