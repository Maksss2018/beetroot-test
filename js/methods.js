var marketMethods ={
    /*TODO:
     3. При нажатии на кнопку ОФОРМИТЬ ЗАКАЗ вывести модальное окно с 2-мя полями - Имя, email и кнопкой Отправить
     При нажатии на кнопку Отправить проверить заполнение полей формы
     - Если поля не заполнены (или заполнены только пробелами) не разрешать отправку формы,
     при этом вывести сообщение в alert

     - Если поля прошли валидацию вывести через alert пользователю сообщение с благодарностью за покупки,
     очистить верхний блок c информацией о товарах, добавленных в корзину
     Товаров в корзине - XXX, на сумму XXX грн

     */
    $:function(str){return document.getElementById(str); },
    $query:function(str){return document.querySelector(str); },
    $queryAll:function(str){return document.querySelectorAll(str); },
    addToBasket:function(event){
        event.preventDefault();
        var basket = {};
        basket.id = event.target.id.slice(0,event.target.id.length-3);// index;
      // console.log(" basket.id = "+event.target.id.slice(0,event.target.id.length-3));
        basket.inputCount = marketMethods.$query('[name="'+basket.id+'-input"]').value;
        basket.inputPrice = marketMethods.$query('[name="'+basket.id+'-input"]').getAttribute("data-sum");
        var totalPrice = basket.inputPrice*basket.inputCount+Number(marketMethods.$query('#total_sum').textContent);
        var totalCount = Number(basket.inputCount)+Number(marketMethods.$query('#total_cont').textContent);
        console.log("total_sum==="+Number(marketMethods.$query('#total_sum').textContent)
            +" basket.inputCount "+totalCount+" ");
        marketMethods.$query('#total_sum').innerHTML = totalPrice;
        marketMethods.$query('#total_cont').innerHTML = totalCount;
        marketMethods.$query('#confirmBtn').setAttribute("data-total-sum",totalPrice);
        marketMethods.$query('#confirmBtn').setAttribute("data-total-count",totalCount);

        },
    elemntItem:function(obj){
     var index = obj.index,
         daraArrayTostring =["0","30","50","100","150"].map(function(item,ind){
     return (' data-price-'+item+'="'+(obj.data.price>=Number(item))+'" ');
        }).join("");
        return ('<div '+
    'id="'+index+'-item"'+
    'data-price="'+obj.data.price+'"'+
        daraArrayTostring  +
    'data-category="'+obj.info.category+'"'+
    ' class="product-box__item">'+
    '<h3 class="product-box__title">' +
    obj.info.name+
    '</h3>'+
    '<div class="product-box__img">'+
    '<img alt="" ' +
    'class="img-fluid"' +
    ' src="i/'+obj.info.img+'">'+
    '</div>'+
    '<div class="product-box__meta">'+
    '<p>'+obj.data.price+' '+obj.data.v+'</p>'+
    '<div class="qty">'+
    '<input class="qty__item"' +
    ' data-sum="'+obj.data.price+'"'+
    ' value="'+obj.data.counter+'"' +
    ' name="'+index+'-input"' +
    ' type="number"> Кол'+
    '</div>'+
    '<button id="'+index+'Btn"' +
    ' class="product-box__btn">' +
    'Добавить' +
    '</button>'+
    '</div>'+
    '</div>')},
    elemntOptionsContainer:function(obj){ return (
        '<div class="'+obj.className+'select-box">'+
        '<label class="filter-label">'+obj.name+' '+(obj.befor!==undefined?obj.befor:"")+'</label>'+
        '<select data-name="'+obj.codeName+'" name="'+obj.ind+'" class="select-control">'+
        obj.select.join(" ")+
        '</select>'+
        (obj.after!==undefined?obj.after:"") +
        '</div>'
    )},
    elemntOptionsItems:function(obj){ return (
        '<option value="'+obj.value+'">'+obj.select+'</option>'
    )},
    getJSON:function(file, callback){
        var req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open("GET", file, true);
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status == "200") {
                callback(req.responseText);
            }
        };
        req.send(null);
    },
    loadPage:function(req,res,err){
        var data = JSON.parse(req),
            htmlComponents = {
                filters:  data.options.map(function(option){return({name:option.codeName,value:"",active:false})}),
                SelectInput :  data.options.map(function(item,ind){
                    item.ind= ind;
                    item.select = item.select.map(function(option,ind){

                        return(
                            marketMethods.elemntOptionsItems({
                                select:option,
                                value:ind})
                        );
                    });
                    return marketMethods.elemntOptionsContainer(item);

                }),
                Items :   data.dishes.map(function(item,ind){
                    item.index= ind;
                    return marketMethods.elemntItem(item);

                })
            },
            selectMethod =function(){
                var  selectorName=[];

                var filters = htmlComponents.filters.map(function(f){
                        var str = f.name!=="price"?'[data-'+f.name+'="'+f.value+'"]':'[data-'+f.name+'-'+["0","30","50","100","150"][f.value]+'="false"]';

                        if(f.active){
                            selectorName.push(str);
                            //    return marketMethods.elemntItem(item);
                        }else{
                            selectorName.slice(selectorName.indexOf(str),1)
                        }
                        return f
                    }),
                    length = selectorName.length-1;
                var selectedItem = marketMethods.$queryAll('div.product-box__item'+selectorName.join(""));
                var notSelectedItem = marketMethods.$queryAll('div.product-box__item');
                //   var notSelectedItem = marketMethods.$queryAll('div.product-box__item:not('+selectorName.join("")+")");
                for(var y=0 ;y<=notSelectedItem.length-1;y++ ){
                    notSelectedItem[y].style.display="none";
                }
                for(var i=0 ;i<=selectedItem.length-1;i++ ){
                    selectedItem[i].style.display="block";
                }
                console.log(" str "+selectorName );
            } ;

        marketMethods.$("filter-container").innerHTML= htmlComponents.SelectInput.join("");
        marketMethods.$("items-container").innerHTML= htmlComponents.Items.join("");
        for(var rr=0;rr<=data.dishes.length-1;rr++){
            marketMethods.$(''+rr+'Btn')
                .addEventListener("click",marketMethods.addToBasket,false);
        }
        for(var y=0 ;y<=data.options.length-1 ;y++){
            marketMethods.$queryAll('select')[y].addEventListener("change",function (e) {
                e.preventDefault();
                var flag,
                    other,selected,
                    newSelect =htmlComponents.filters[e.target.name];
                newSelect.active = Number( e.target.value )!==0 ? true : false;
                newSelect.value =Number(e.target.name!=="price"?e.target.value
                    :[0,30,50,100,150][Number( e.target.value )]);
                flag = htmlComponents.filters.filter(function(obj){ return obj.active===true }).length!==0;
                setTimeout(function(){
                    flag? selectMethod():marketMethods.$("items-container").innerHTML= htmlComponents.Items.join("");
                },500);

            });
        }
        console.log(" location "+window.location.path);

    },
    modalGenerator : function(event){
        !marketData.flag?marketMethods.$query("body").style.zIndex=0:console.log("!!");
        var formContainer =document.createElement("DIV"),
            formOptions =
                {
                    form:{class:"form-body"},
                    inputEmail:{ class:"qty__item form-input",
                        type:"email",placeholder:"email",id:"input_mail"},
                    inputPass:{ class:"qty__item form-input",
                        type:"text",placeholder:"имя",id:"input_name"},
                    inputButton:{class:"send-btn btn-check"
                        ,id:"sendBtn",type:"button"},
                    span:{class:"span-form"}
                },
            formHTMLnode ={
                form : document.createElement("FORM"),
                inputPass : document.createElement("INPUT"),
                inputEmail : document.createElement("INPUT"),
                span : document.createElement("SPAN"),
                inputButton : document.createElement("BUTTON")
            };
        for(var key in formHTMLnode ){
            var target = formHTMLnode[key];
            for(var k in formOptions[key] ){
                target.setAttribute(""+k+"",""+formOptions[key][k]+"");
            }
            formContainer.appendChild(formHTMLnode[key]);

        };

        formHTMLnode.inputButton.textContent = "Отправить";
        formHTMLnode.span.textContent = "В приобрели блюд:"+
            marketMethods.$query('#total_cont').textContent
            +" на сумму = "+
            marketMethods.$query('#total_sum').textContent
            +" грн.";
        formContainer.setAttribute("class","form-container");
        formContainer.setAttribute("id","formContainer");
        formHTMLnode.form.appendChild(formHTMLnode.span);
        formHTMLnode.form.appendChild(formHTMLnode.inputPass);
        formHTMLnode.form.appendChild(formHTMLnode.inputEmail);
        formHTMLnode.form.appendChild(formHTMLnode.inputButton);

        formHTMLnode.inputButton.addEventListener("click",function(event){
            event.preventDefault();
            var obj ={};
            ["mail","name"].map(function(item){
                obj[item]= marketMethods.$query("#input_"+item).value;
                return item;
            });
            if(obj.name.length>=4&&obj.name.match( / /ig ).length!==obj.name.length){
                alert("В приобрели блюд:"+
                    marketMethods.$query('#total_cont').textContent
                    +" на сумму = "+
                    marketMethods.$query('#total_sum').textContent
                    +" грн. Спасибо за покупку!");
                marketMethods.$query('#total_cont').textContent=0;
                marketMethods.$query('#total_sum').textContent=0;
                marketMethods.$query('#formContainer').remove();
            }else{
                alert("Вы не правильно заполнили форму");
            }
            console.log(" objobj "+JSON.stringify(obj.name));


        });


        marketMethods.$query("body").appendChild(formContainer);
        marketData.flag = !marketData.flag;

    }
}, marketData ={flag:false};