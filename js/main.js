import {marketMethods} from "./methods.js";
fetch("./js/items.json")
    .then((data)=>data.json())
    .then(data=> marketMethods.loadPage(data))
    .catch(error => error);
marketMethods.$query("#confirmBtn").addEventListener("click", marketMethods.modalGenerator);

