const socket = io();

let id_p =document.getElementById('id').value;
let title_p= document.getElementById('title').value;
let description_p = document.getElementById('description').value;
let price_p = document.getElementById('price').value;
let thumbnail_p = document.getElementById('thumbnail');
let code_p = document.getElementById('code');
let stock_p = document.getElementById('stock').value;

let new_product = {
    "tittle": title_p,
    "description": description_p,
    "price": price_p,
    "thumbnail": thumbnail_p,
    "code": code_p,
    "stock": stock_p
}
if(title_p.length===0 || description_p.length ===0 || price_p.length ===0 || 
   thumbnail_p.length===0 || code_p.length===0 || stock_p.length===0){
     Swal.fire({
         html:"<b>Rellene todos los campos</b>",
         toast:true,
         showConfirmButton: false,
         position:'top-right',
         timer:4000,
         timerProgressBar:true,
         color:"white",
         background:"red"
     })    
    }else{
     socket.emit('add_item',item_new)
 }
 socket.on("added_item",function(){
    if(data[0]===false){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El producto ya existe'
      });
    }else{
        Swal.fire({
            icon: 'success',
            title: 'Exito',
    });}
 });

