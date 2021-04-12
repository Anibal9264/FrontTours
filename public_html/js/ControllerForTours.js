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
                "p": "StarPTour",
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