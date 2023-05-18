import KabanApi from "./api/kabanApi.js";
import KabanView from "./view/kabanView.js";
//console.log(KabanApi.getItems(2))
//KabanApi.insertItems(2,"just test")
//KabanApi.updateItems(42228,{columnId:1, position:2,content:"New 2 content"})
//KabanApi.deleteItems(15271)
new KabanView(document.querySelector(".kaban")) 