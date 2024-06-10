// =================== ADD Product ========================

var btnAddProduct =document.getElementById('btnAddProduct');

btnAddProduct.addEventListener('click',function(eventInfo){

    // eventInfo.preventDefault();
    addProduct();

})

var dataProductList=[];

if(localStorage.getItem('product') != null){

    dataProductList=JSON.parse(localStorage.getItem('product'));
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

    dataProductList.push(createProduct);
    localStorage.setItem('product',JSON.stringify(dataProductList));
    displayProduct();

}

//=========================== Display Product===========

var divRow =document.querySelector('.row');

function displayProduct(){

    var cartona =``;

    for(var i =0; i <dataProductList.length; i++){

        cartona +=`
        <h2 class="h6 alert alert-danger d-none">Cannot be deleted during update</h2>
        <div class="col-lg-3">
            <div class="card">
              <img src="${dataProductList[i].Img}" class="card-img-top w-100" alt="...">
              <div class="card-body">
                <h2 class="h5 card-title">${dataProductList[i].Name}</h2>
                <h2 class="h5 card-title">${dataProductList[i].Categoty}</h2>
                <h2 class="h5 card-title">$ ${dataProductList[i].Price}</h2>
                <p class="card-text">${dataProductList[i].Desc}</p>
                <button onclick="deleteProduct(${i})" class="btnDelet btn btn-danger w-100 mb-2"><i class="fa fa-trash me-1"></i>product Delete</button>
                <button onclick="setFormProduct(${i})" class="btnUpdate btn btn-warning w-100 mb-2"><i class="fa fa-edit me-1"></i>product Update</button>
              </div>
            </div>
        </div>`

    }

    divRow.innerHTML =cartona;


}

displayProduct();

// ============================ DELETE Product or RETURN delete Product============

var btnDelet =document.querySelector('.btnDelet');
var Alert =document.querySelector('.alert');

function deleteProduct(indexofProduct){

    if(carentIndex ==indexofProduct){
        Alert.classList.remove('d-none');
        return;
    }

    deletListProduct.unshift(dataProductList.splice(indexofProduct,1));
    localStorage.setItem('product',JSON.stringify(dataProductList));
    displayProduct();
}
var btnReturnAllDelet =document.querySelector('.btnReturnAllDelet');

btnReturnAllDelet.addEventListener('click',function(eventInfo){

    eventInfo.preventDefault();
    returnAll();
})

function returnAll(){

    for( var i =0; i<deletListProduct.length; i++){

        dataProductList.push(deletListProduct[i][0])
    }

    console.log(dataProductList);
    displayProduct();
    localStorage.setItem('product',JSON.stringify(dataProductList));
    deletListProduct.slice(0,deletListProduct.length);
    console.log(deletListProduct);
}

var btnReturnLastDelet =document.querySelector('.btnReturnLastDelet');
btnReturnLastDelet.addEventListener('click',function(eventInfo){

    eventInfo.preventDefault();
    returnLastDelet();

})
var deletListProduct=[];
function returnLastDelet(){
    dataProductList.push(deletListProduct[0][0]);
    // console.log(deletListProduct);
    displayProduct();
    localStorage.setItem('product',JSON.stringify(dataProductList));
}

//=========================== Update Product==================
// var btnUpdate =document.querySelector('.btnUpdate')
 var btnUpdateProduct =document.getElementById('btnUpdateProduct');

 function setFormProduct(UpdateIndex){

     carentIndex =UpdateIndex;

     btnAddProduct.classList.add('d-none');
     btnUpdateProduct.classList.remove('d-none');
     
     productNameInput.value =dataProductList[UpdateIndex].Name
     productCategotyInput.value =dataProductList[UpdateIndex].Categoty
     productPriceInput.value =dataProductList[UpdateIndex].Price
     productDescInput.value =dataProductList[UpdateIndex].Desc
     // productImgInput.value =dataProductList[UpdateIndex].Img
     }

     btnUpdateProduct.addEventListener('click',function(eventInfo){

         updateProduct(carentIndex);;

         })

        var carentIndex;

function updateProduct(carentIndex){

    btnAddProduct.classList.add('d-none');
    btnUpdateProduct.classList.remove('d-none');

    dataProductList[carentIndex].Name =productNameInput.value;
    dataProductList[carentIndex].Categoty =productCategotyInput.value;
    dataProductList[carentIndex].Price =productPriceInput.value;
    dataProductList[carentIndex].Desc =productDescInput.value;
    dataProductList[carentIndex].Img =`imges/${productImgInput.files[0]?.name}`;

    localStorage.setItem('product',JSON.stringify(dataProductList));
    displayProduct();

}