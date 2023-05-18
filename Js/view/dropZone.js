import KabanApi from "../api/kabanApi.js"

export default class DropZone {
    static createDropZone = () => {
        const range = document.createRange()
        range.selectNode(document.body)

        const dropZone = range.createContextualFragment(`
                <div class="item_drop_zone"></div>
            `).children[0]
            
        dropZone.addEventListener('dragover', e => {
            e.preventDefault()
            dropZone.classList.add("item_drop_zone--active")
        }) 

        dropZone.addEventListener("dragleave", e=>{
            dropZone.classList.remove("item_drop_zone--active")
        })
        dropZone.addEventListener("drop", e=>{
            dropZone.classList.remove("item_drop_zone--active")

            const columnElmt = dropZone.closest(".kaban_column")
            const columnId = Number(columnElmt.id)

            const dropZonesColumn = Array.from(columnElmt.querySelectorAll(".item_drop_zone"))
            const indexDropZone = dropZonesColumn.indexOf(dropZone)
            //from the data transfet we did in Itme.js
            const itemId = Number(e.dataTransfer.getData("text/plain"))
            const droppedElmt = document.getElementById(itemId)
            KabanApi.updateItems(itemId,{columnId:columnId, position:indexDropZone})
            //prevent a potentiel bug. to drag and drop on an undropzone
            if(droppedElmt.contains(dropZone)){
                return
            }
            //drop the elt after an Item or if no Item, after a dropzone
            const dropAfter = dropZone.parentNode.classList.contains("kaban_item") ? dropZone.parentNode : dropZone
            dropAfter.after(droppedElmt)
        })


        return dropZone
    }
    
}