// =================== ADD Product ========================

var btnAddProduct =document.getElementById('btnAddProduct');

btnAddProduct.addEventListener('click',function(eventInfo){

    if( 
        productNameInput.classList.contains('is-valid')&&
        productCategotyInput.classList.contains('is-valid')&&
        productPriceInput.classList.contains('is-valid')&&
        productDescInput.classList.contains('is-valid')&&
        productImgInput.classList.contains('is-valid')
      )
      {
          addProduct();
      }
      else{

        alert('The Form Is Not Valid Or Choose Picture');

      }

});

var productList=[];

if(localStorage.getItem('product') != null){

    productList=JSON.parse(localStorage.getItem('product'));
}
//                     == INPUT ==

var productNameInput =document.getElementById('productNameInput');
var productCategotyInput =document.getElementById('productCategotyInput');
var productPriceInput =document.getElementById('productPriceInput');
var productDescInput =document.getElementById('productDescInput');
var productImgInput =document.getElementById('productImgInput');

function addProduct(){

    createProduct ={

        Name:productNameInput.value,
        Categoty:productCategotyInput.value,
        Price:productPriceInput.value,
        Desc:productDescInput.value,
        Img:`imges/${productImgInput.files[0]?.name}`,
    }

    productList.push(createProduct);
    localStorage.setItem('product',JSON.stringify(productList));
    displayProduct(productList);

}

//=========================== Display Product===========

var divRow =document.querySelector('.row');

function displayProduct(list){

    var cartona =``;

    for(var i =0; i <list.length; i++){

        cartona +=
        `
        <h2 class="h6 alert alert-danger d-none">Cannot be deleted during update</h2>
        <div class="col-lg-3 g-4">
            <div class="card">
              <img src="${list[i].Img}" class="card-img-top w-100" alt="...">
              <div class="card-body">
                <h2 class="h5 card-title">${list[i].Name}</h2>
                <h2 class="h5 card-title">${list[i].Categoty}</h2>
                <h2 class="h5 card-title">$ ${list[i].Price}</h2>
                <p class="card-text">${list[i].Desc}</p>
                <button onclick="deleteProduct(${i})" class="btnDelet btn btn-danger w-100 mb-2"><i class="fa fa-trash me-1"></i>product Delete</button>
                <button onclick="setFormProduct(${i})" class="btnUpdate btn btn-warning w-100 mb-2"><i class="fa fa-edit me-1"></i>product Update</button>
              </div>
            </div>
        </div>
        `
    }

    divRow.innerHTML =cartona;
};

displayProduct(productList);

// ============================ DELETE Product or RETURN delete Product============

var btnDelet =document.querySelector('.btnDelet');
var Alert =document.querySelector('.alert');

function deleteProduct(indexofProduct){

    if(carentIndex ==indexofProduct){
        Alert.classList.remove('d-none');
        return;
    }

    deletListProduct.unshift(productList.splice(indexofProduct,1));
    localStorage.setItem('product',JSON.stringify(productList));
    displayProduct(productList);
}
var btnReturnAllDelet =document.querySelector('.btnReturnAllDelet');

//                == Return All Delet ==

btnReturnAllDelet.addEventListener('click',function(eventInfo){

    eventInfo.preventDefault();
    returnAll();
});

function returnAll(){

    for( var i =0; i<deletListProduct.length; i++){

        productList.push(deletListProduct[i][0])
    };

    displayProduct(productList);
    localStorage.setItem('product',JSON.stringify(productList));
    deletListProduct=deletListProduct.slice(0,0);

};

//                  == Return Last Delet ==

var btnReturnLastDelet =document.querySelector('.btnReturnLastDelet');

btnReturnLastDelet.addEventListener('click',function(eventInfo){

    eventInfo.preventDefault();
    returnLastDelet();

});

var deletListProduct=[];

function returnLastDelet(){
    productList.push(deletListProduct[0][0]);
    deletListProduct=deletListProduct.slice(0,0);
    displayProduct(productList);
    localStorage.setItem('product',JSON.stringify(productList));
};

//========================================= Update Product====================================


function setFormProduct(UpdateIndex){
    
    carentIndex =UpdateIndex;
    
    btnAddProduct.classList.add('d-none');
    btnUpdateProduct.classList.remove('d-none');
    
    productNameInput.value =productList[UpdateIndex].Name
    productCategotyInput.value =productList[UpdateIndex].Categoty
    productPriceInput.value =productList[UpdateIndex].Price
    productDescInput.value =productList[UpdateIndex].Desc
    // productImgInput.value =productList[UpdateIndex].Img
    }
    
    var btnUpdateProduct =document.getElementById('btnUpdateProduct');
    
btnUpdateProduct.addEventListener('click',function(eventInfo){

        if( 
            productNameInput.classList.contains('is-valid')||
            productCategotyInput.classList.contains('is-valid')||
            productPriceInput.classList.contains('is-valid')||
            productDescInput.classList.contains('is-valid')||
            productImgInput.classList.contains('is-valid')
          )
          {
            updateProduct(carentIndex);
          }
          else{
    
            alert('The Form Is Not Valid');
    
          }

         

})

        var carentIndex;

function updateProduct(carentIndex){

    btnAddProduct.classList.add('d-none');
    btnUpdateProduct.classList.remove('d-none');

    productList[carentIndex].Name =productNameInput.value;
    productList[carentIndex].Categoty =productCategotyInput.value;
    productList[carentIndex].Price =productPriceInput.value;
    productList[carentIndex].Desc =productDescInput.value;
    productList[carentIndex].Img =`imges/${productImgInput.files[0]?.name}`;

    localStorage.setItem('product',JSON.stringify(productList));
    displayProduct(productList);

}
// ==================== Searsh Product ===================

var productSearshInput=document.getElementById('productSearshInput');

productSearshInput.addEventListener('input',function(eventInfo){

    searshProduct();

});
function searshProduct(){

    var searshList=[];

    for(var i =0; i<productList.length; i++){

        if(productList[i].Name.toLowerCase().includes(productSearshInput.value.toLowerCase())){

            searshList.push(productList[i]);

        }
    }
    
    
    displayProduct(searshList);
}

// ======================= Validation ============================

productNameInput.addEventListener('input',function(eventInfo){

    validationProduct(this);

});
productCategotyInput.addEventListener('input',function(eventInfo){

    validationProduct(this);
    
});
productPriceInput.addEventListener('input',function(eventInfo){

    validationProduct(this);
    
});
productDescInput.addEventListener('input',function(eventInfo){

    validationProduct(this);
    
});
productImgInput.addEventListener('click',function(eventInfo){

    productImgInput.classList.add('is-valid');
    
});
function validationProduct(element){

    valedation ={
        productNameInput: /^\w{3,25}\s?\w{0,10}\s?$/,
        productCategotyInput:/^[A-Z][a-z]{1,30}\s?$/ ,
        productPriceInput:/^[1-9][0-9]{3,7}$/ ,
        productDescInput:/^\w{3,50}\s?$/ ,


    }
    if(valedation[element.id].test(element.value)){

        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');

    }
    else{

        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        element.nextElementSibling.classList.remove('d-none');

    }

}
