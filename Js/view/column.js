import KabanApi from '../api/kabanApi.js';
import DropZone from './dropZone.js';
import Item from './item.js';

export default class Column {
  constructor(id, title) {
    this.elements = {}; // elements is also a propety of Column as id and title
    // this elmt is a object
    // an object with those keys
    this.elements.root = Column.createRoot();
    const topDropZone = DropZone.createDropZone();
    // look this keys in the key "root" insted of "document"
    this.elements.title = this.elements.root.querySelector('.column_title');
    this.elements.item = this.elements.root.querySelector('.kaban_items');
    this.elements.addItem = this.elements.root.querySelector('.kaban_btn_add');
    // give value to those attribute
    this.elements.root.setAttribute('id', id);
    this.elements.title.textContent = title;
    //
    this.elements.item.appendChild(topDropZone);
    this.elements.addItem.addEventListener('click', () => {
      const newItem = KabanApi.insertItems(id, '');
      this.renderItem(newItem);
    });
    // CONSTRUCTION OF ITEMS IN COLUMN
    KabanApi.getItems(id).forEach((item) => {
      // const itemView = this.renderItem(item)
      // this.elements.item.appendChild(itemView.elements.root)
      this.renderItem(item);
    });
  }

  static createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(` 
                <div class="kaban_column">
                    <h2 class="column_title"></h2>
                    <div class="kaban_items">
                    </div>
                    <button class="kaban_btn_add" type="button">+ Add</button>
                </div>
            `).children[0];
  }

    renderItem = (data) => {
      // TODO: creata instance of item

      const newItem = new Item(data.id, data.content);
      this.elements.item.appendChild(newItem.elements.root);
      return newItem;
    }
}
