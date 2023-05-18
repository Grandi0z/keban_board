import KabanApi from '../api/kabanApi.js';
import DropZone from './dropZone.js';

export default class Item {
  constructor(id, content) {
    const buttomDropZone = DropZone.createDropZone();
    this.content = content;
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector('.item_input');

    this.elements.root.setAttribute('id', id);
    this.elements.input.textContent = this.content;
    this.elements.root.appendChild(buttomDropZone);
    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim();
      // console.log(newContent)
      this.content = newContent;
      KabanApi.updateItems(id, { content: this.content });
    };

    this.elements.input.addEventListener('blur', onBlur);
    this.elements.root.addEventListener('dblclick', () => {
      const check = true;
      //window.confirm('Do you really want to confirm this ?');
      if (check) {
        KabanApi.deleteItems(id);
        this.elements.input.removeEventListener('blur', onBlur);
        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });
    this.elements.root.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', id);
    });
    this.elements.input.addEventListener('drop', (e) => {
      e.preventDefault();
    });
  }

    static createRoot = () => {
      const range = document.createRange();
      range.selectNode(document.body);
      return range.createContextualFragment(`
            <div class="kaban_item" draggable='true'>
                <p class="item_input" contenteditable></p>
            </div>
        `).children[0];
    }
}