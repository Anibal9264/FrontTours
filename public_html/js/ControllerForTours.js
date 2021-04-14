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
                  "<div class='event-default-caption'><a class='button button-xs button-secondary button-nina' href='tour.html?t="+t.id+"'>Ver Mas</a></div>"+
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
                $("#tid"+id+"").html("<figure class='event-default-image'><img class='img-mod1' src='"+r.img+"'/></figure>");
             
                      
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
                $("#star"+id+"").html(cod);
                 
                }
        });
}

$("#buscar").on("click", function(){
    var posicion = $("#tourviewgrup").offset().top;
    $("html, body").animate({
        scrollTop: posicion
    }, 2000); 
});


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
             

