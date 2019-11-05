const itemTemplate =({ index, price, v, counter, category, name, img, daraArrayToString })=>('<div id="'+index+'-item" data-price="'+price+'"'+ daraArrayToString  + 'data-category="'+category+'"  class="product-box__item">'+
    '<h3 class="product-box__title">' + name+ '</h3>' +
    '<div class="product-box__img">'+
    '<img alt="" class="img-fluid" src="i/'+img+'">'+
    '</div>'+
    '<div class="product-box__meta">'+
    '<p>'+price+' '+v+'</p>'+
    '<div class="qty">'+
    '<input class="qty__item" data-sum="'+price+'"  value="'+counter+'"  name="'+index+'-input" type="number"> Кол '+
    '</div>'+
    '<button id="'+index+'Btn" class="product-box__btn">' +
    'Добавить' +
    '</button>'+
    '</div>'+
    '</div>');

const elementOptionsContainer = ({ className, codeName, after, select, name, befor, ind }) => (
    '<div class="'+className+'select-box">'+
    '<label class="filter-label">'+name+' '+(befor!==undefined?befor:"")+'</label>'+
    '<select data-name="'+codeName+'" name="'+ind+'" class="select-control">'+
    select.join(" ")+
    '</select>'+
    (after!==undefined?after:"") +
    '</div>'
);
const  elemntOptionsItems = ({ value, select }) => (
    '<option value="'+value+'">'+select+'</option>'
)

export { itemTemplate, elementOptionsContainer, elemntOptionsItems };