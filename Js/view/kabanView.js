import Column from './column.js';

export default class KabanView {
  constructor(root) {
    this.root = root;

    KabanView.columns().forEach((column) => { // from this array
      // TODO: create an instance Column class
      const columnView = new Column(column.id, column.title);
      this.root.appendChild(columnView.elements.root);
    });
  }

  static columns() {
    // this method returns an array of 3 objects
    return [
      {
        id: 1,
        title: 'Not Started',
      },
      {
        id: 2,
        title: 'In Progress',
      },
      {
        id: 3,
        title: 'Completed',
      },
    ];
  }
}