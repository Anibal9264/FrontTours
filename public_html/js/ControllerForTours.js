function Menu(){
    var menu = $("#menu");
    menu.html("");
    if (sessionStorage.getItem('usuario')) { 
        menu.html("<li> <a href='index.html'>Inicio</a> </li>" +
                "<li> <a href='carrito.html'>Carrito</a> </li>" +
                "<li> <a href='index.html'>Reservas</a> </li>" +
                "<li> <a href='#' id='salir'>Salir</a> </li>");
    } else{
        menu.html("<li> <a href='index.html'>Inicio</a> </li>" +
                "<li> <div class='rd-navbar-aside-right'> <a class='button button-sm button-secondary button-nina' href='login.html'>Inicie sesion</a> </div> </li>");
    }
}

function Login(){
    var parametros = {
                "p" : "Login",
                "email": $("#email").val(),
                "password" : $("#password").val()
        };
       
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'GET',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                    if (response != "false"){
                        r = JSON.parse(response);
                        sessionStorage.setItem('usuario', JSON.stringify(r));
                        window.location.href = "index.html";
                    }
                    else{
                        alert("Datos incorrectos!");
                    }
                }
        });
        
}

function Registro(){
    if ($("#nombre").val() !== ""){
    var parametros = {
                "p" : "Registro",
                "nombre": $("#nombre").val(),
                "apellidos": $("#apellidos").val(),
                "id": $("#id").val(),
                "fechanac": $("#fechanac").val(),
                "email": $("#email").val(),
                "password" : $("#password").val()
        };
       
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'POST',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                    if (response != "false"){
                        r = JSON.parse(response);
                        sessionStorage.setItem('usuario', JSON.stringify(r));
                        window.location.href = "index.html";
                    }
                    else{
                        alert("Error al registrar!");
                    }
                }
        });
    }
}

$('#salir').on("click", () => {
     sessionStorage.removeItem('usuario');
     window.location.href = "index.html";});

function SearchTour(){
    var parametros = {
                "p": "SearchTour",
                "search": $("#busqueda").val(),
                "date1" : $("#Ida").val(),
                "date2" : $("#Vuelta").val()
        };
        
        
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'GET',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                      r = JSON.parse(response);
                      RenderGourpTours(r);
                 }
        });
        
}

function RenderGourpTours(r){
    var html = "";
     r.forEach(t =>
       html += "<div class='col-md-5 col-xl-3'>"+
              "<article class='event-default-wrap'>"+
                "<div class='event-default'>"+
                  "<div id='tid"+t.id+"'></div>"+
                  "<div class='event-default-caption'>"+
           "<a class='button button-xs button-secondary button-nina' href='tour.html?t="+t.id+"'>Ver Mas</a>"+
                "</div>"+
                "</div>"+
                "<div class='event-default-inner'>"+
                " <h5><a class='event-default-title' href='#'>"+t.nombre+"</a></h5><span class='heading-5'>₡ "+t.precio+"</span>"+
                "</div>"+
                "<div class='ec-stars-wrapper'>"+
                "<div class='row ml-0'>Duración: "+t.duracion+"</div>"+
                "<div id='star"+t.id+"'></div>"+
	    "</div>"+
              "</article>"+
            "</div>"
      );
      
      $("#tourviewgrup").html(html);
      
      r.forEach(t =>
      GetDatosTorP(t)
      );
}

function GetDatosTorP(t){
    GetImgPTour(t.id);
    GetStarsPTour(t.id);
    isFavorite(t.id);
}

function GetImgPTour(id){
    var parametros = {
                "p": "ImgPTour",
                "id" : id
        };
        
        
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'GET',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                      r = JSON.parse(response);
                $("#tid"+id+"").html("<figure class='event-default-image'>"+
                        "<a id='isF"+id+"' href='#'></a>"+
                        "<img class='img-mod1' src='"+r.img+"'/>"+
                        "</figure>");
             
                      }
        });
        
}

function GetStarsPTour(id){
    var parametros = {
                "p": "StarsTour",
                "id" : id
        };
        
        
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'GET',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                r = JSON.parse(response);
                calificacion = r.stars/r.cantidad; 
                var cod = "<span class='mr-1' >Opiniones: "+r.cantidad+"</span>";
                for (var i = 1; i < calificacion; i++) {
                  cod += "<i class='float-right' style='color:#ffa900;' >&#9733;</i>";
                }
                $("#star"+id).html(cod);
                 
                }
        });
}

$("#buscar").on("click", function(){
    var posicion = $("#tourviewgrup").offset().top;
    $("html, body").animate({
        scrollTop: posicion
    }, 2000); 
});



function isFavorite(tour){
    var user = JSON.parse(sessionStorage.getItem('usuario'));
    var parametros = {
                "p" : "isFavorite",
                "tour" : tour,
                "user" : user.id
        };
        
        
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'GET',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                r = JSON.parse(response);
                var html = "";
                if(r){
                 html += "<i style='position: absolute; right: 15px; bottom: 160px;' class='far fa-heart'></i> ";
                }
        
                $("#isF"+tour).html(html);
                 
                }
        });
}


function GetTour(){
   var valor = obtenerValorParametro('t'); 
    var parametros = {
                "p": "GetTour",
                "id": valor,       
        };
        
        
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'GET',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                      r = JSON.parse(response);
                      renderImagenesTour(r.imgs);
                      renderDetallesTour(r.tour);
                      renderStras(r.stars);
                      renderDetallesAvansados(r.tour,r.incluye, r.noincluye,r.categoria);
                      renderComentarios(r.resenias);
                 }
        });
        
}

function renderImagenesTour(imgs){
  var html = "<ol id='carousel' class='carousel-indicators'>";
    for (var i = 0; i < imgs.length; i++) {
         if(i==0)html += "<li data-target='#carousel' data-slide-to='0' class='active'></li>";
         else html += "<li data-target='#carousel' data-slide-to="+i+"></li>";
    }
    html += "</ol> <div class='carousel-inner'>";
    for (var i = 0; i < imgs.length; i++) {
        if(i==0){
        html += "<div class='carousel-item active'>"+
        "<img class='imgCarrusel' src='"+imgs[i].img+"'>"+
        "</div>";
        }else{
        html += "<div class='carousel-item'>"+
        "<img class='imgCarrusel' src='"+imgs[i].img+"'>"+
        "</div>";
        }
        }
 
    html += "</div>"+
  "<a class='carousel-control-prev' href='#carousel' role='button' data-slide='prev'>"+
    "<span class='carousel-control-prev-icon' aria-hidden='true'></span>"+
    "<span class='sr-only'>Previous</span>"+
  "</a>"+
  "<a class='carousel-control-next' href='#carousel' role='button' data-slide='next'>"+
    "<span class='carousel-control-next-icon' aria-hidden='true'></span>"+
    "<span class='sr-only'>Next</span>"+
  "</a>";
  
  $("#carousel").html(html);
}


function obtenerValorParametro(sParametroNombre) {
var sPaginaURL = window.location.search.substring(1);
 var sURLVariables = sPaginaURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParametro = sURLVariables[i].split('=');
    if (sParametro[0] == sParametroNombre) {
      return sParametro[1];
    }
  }
 return null;
}


function renderDetallesTour(tour){
    $("#tourTitle").html(tour.nombre);
    $("#tourTitleh4").html(tour.nombre);
    $("#detalle").html(tour.descripcion);
}

function renderStras(r){
    calificacion = r.stars/r.cantidad; 
                var cod = "";
                var i = 0; 
                for (i = 1; i < calificacion; i++) {
                  cod += "<i style='color:#ffa900;' >&#9733;</i>";
                }
                i--;
                cod += "<span class='ml-1' >"+i+"/5</span>";
                
                cod += "<span class='ml-1' >Opiniones: "+r.cantidad+"</span>";
                $("#star").html(cod);
                  
}


function renderDetallesAvansados(tour,incluye,noincluye,categoria){
    var html = " <div class='col-lg-6 mb-2'>"+
               " <div class='card bg-light text-black shadow'>"+
                  " <div class='card-body'>"+
                       " <span class='icon mr-1'>"+
                       "    <i class='fas fa-clock-o'></i>"+
                      "   </span>"+
                      " <span class='text text-bold'>Duración: "+tour.duracion+" horas</span>"+
                   "  </div>"+
               " </div>"+
            "</div>";
    
       html += " <div class='col-lg-6 mb-2'>"+
               " <div class='card bg-light text-black shadow'>"+
                  " <div class='card-body'>"+
                       " <span class='icon mr-1'>"+
                       "    <i class='fas fa-ticket'></i>"+
                      "   </span>"+
                      " <span class='text text-bold'>Cupos disponibles: "+tour.cupo+"</span>"+
                   "  </div>"+
               " </div>"+
            "</div>";
    
    html += " <div class='col-lg-6 mb-2'>"+
               " <div class='card bg-light text-black shadow'>"+
                  " <div class='card-body'>"+
                       " <span class='icon mr-1'>"+
                       "    <i class='fas fa-ticket'></i>"+
                      "   </span>"+
                      " <span class='text text-bold'>Categoria: "+categoria.nombre+"</span>"+
                      " <br> <span class='text'>"+categoria.descripcion+"</span>"+
                   "  </div>"+
               " </div>"+
            "</div>";
    
     html += " <div class='col-lg-6 mb-2'>"+
               " <div class='card bg-light text-black shadow'>"+
                  " <div class='card-body'>"+
                       " <span class='icon mr-1'>"+
                       "    <i class='fas fa-ticket'></i>"+
                      "   </span>"+
                      " <span class='text text-bold'>Incluye:</span>";
          incluye.forEach(inc => 
           html += " <br> <span class='text'>"+inc.nombre+": "+inc.descripcion+"</span>"
          );
                     
       html += "  </div>"+
               " </div>"+
     "</div>";
     
      html += " <div class='col-lg-6 mb-2'>"+
               " <div class='card bg-light text-black shadow'>"+
                  " <div class='card-body'>"+
                       " <span class='icon mr-1'>"+
                       "    <i class='fas fa-ticket'></i>"+
                      "   </span>"+
                      " <span class='text text-bold'>No Incluye:</span>";
          noincluye.forEach(ninc => 
           html += " <br> <span class='text'>"+ninc.nombre+": "+ninc.descripcion+"</span>"
          );
                     
       html += "  </div>"+
               " </div>"+
     "</div>";
    
    
    $("#detAvanzado").html(html);
}
             
function renderComentarios(resenias){
     var html = "";
    resenias.forEach(res => 
      html+=renderAllComent(res)
     );
      $("#listComents").html(html);
     resenias.forEach(res => 
      renderPersona(res.Usuario,res.id)
     );
      
}

function renderAllComent(res){
          var html = "<div class='col-lg-8 mt-1'>"+
               "<div class='card bg-light text-black shadow'>"+
                  "<div class='card-body'>"+
                      "<div class='row mt-0'>";
                for (var i = 0; i < res.calificacion; i++) {
                  html += "<i style='color:#ffa900;' >&#9733;</i>";
                }
               html +=  "</div>"+
                      "<div class='row mt-0'>"+res.comentario+"</div>"+
                      "<div id='coment"+res.id+"' class='row mt-0'></div>"+
                   "</div>"+
               "</div>"+
                "</div>";
                
                return html;          
}


function renderPersona(user,coment){
    var parametros = {
                "p": "GetUser",
                "id": user      
        };
        
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'GET',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                      r = JSON.parse(response);
                      $("#coment"+coment).html(
                       "<div class='mt-1'> <img src='"+r.foto+"' class='img-perfilC mr-2'>" +     
                          r.nombreC +" / "+r.pais+"</div>"
                            );
                 }
        });
}

function Islogue(){
var user = sessionStorage.getItem('usuario');
if(user){
    $("#bAdd").attr("onclick","addCarrito("+obtenerValorParametro('t')+")");
    $("#bAdd").removeAttr("href",true);
    $("#bAdd").attr("href","#");
    
}
}


function addCarrito(id){
    var user = $.parseJSON(sessionStorage.getItem('usuario'));
    var parametros = {
                "p": "addCarrito",
                "tour": id,
                "user": user.id
        };
        
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'POST',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                    $("#agregar").removeAttr("<a>", true);
                    $("#agregar").html("<div class='button button-sm button-secondary button-nina'>Agregado</div>");
                }
        });
}

function OpcionCart(){
    var user = $.parseJSON(sessionStorage.getItem('usuario'));
    var parametros = {
                "p": "opcionCart",
                "user": user.id
        };
        
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'GET',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                    r = JSON.parse(response);
                    renderOpcionCart(r);
                }
        });
}

function renderOpcionCart(r){
    r.forEach(t => getTourOpcion(t.Tour, t.cantidad));
}

function getTourOpcion(tour, cantidad){
    var parametros = {
                "p": "GetTour",
                "id": tour     
        };
            
        $.ajax({
                data:  parametros,
                url:   'http://localhost/Tours/',
                type:  'GET',
                beforeSend: function () {
                        
                },
                success:  function (response) {
                      r = JSON.parse(response);
                      var html    = "<li style='text-align: left'>"+
                      "<div> <h4> "+ r.tour.nombre + "</h4> </div>" +
                      "<div> "+ r.tour.descripcion +" </div>" +
                      "<div class='row'>" + 
                      "<div class='col-sm-6 col-lg-6'>" +
                      "<span class='icon mr-1'>"+
                      "<i class='fas fa-clock-o'></i>"+
                      "</span>"+
                      "<span class='text text-bold'>Duración: "+r.tour.duracion+" horas" + 
                      "</span>" +
                      "</div" +
                      "<div class='col-sm-6 col-lg-6'>" +
                      "</div" +
                      "</div>" +
                      "</li>";
      
                    $("#opcionCart").html(html);
                }
        });
     
    
}