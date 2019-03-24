import { api, LightningElement } from 'lwc';

export default class Dndlist extends LightningElement {
    @api tasklist;
    @api category;


    handleDragOver(evt) {
        evt.preventDefault();
    }

    handleItemDrag(evt) {
        const event = new CustomEvent('listitemdrag', {
            detail: evt.detail
        });

        this.dispatchEvent(event);
    }

    handleDrop(evt) {
        const event = new CustomEvent('itemdrop', {
            detail: this.category
        });
        
        this.dispatchEvent(event);
    }
}