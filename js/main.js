document.addEventListener("DOMContentLoaded",function () {
    marketMethods.getJSON("./js/items.json",marketMethods.loadPage);
});
marketMethods.$query("#confirmBtn").addEventListener("click", marketMethods.modalGenerator);

