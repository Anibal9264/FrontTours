function SearchTour(){
    var parametros = {
                "p": "SearchTour",
                "search" : "",
                "date1" : "2021-02-03",
                "date2" : "2021-02-04"
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


function GetImgsTour(id){
    var parametros = {
                "p": "ImgsTour",
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
                      $("#contenido").html("<img src='"+r[0].img+"' width='600' height='338' alt='playa_blanca'/>");
                      
                }
        });
        
}


function RenderGourpTours(r){
    var html = "";
     r.forEach(t =>
       html += "<div class='col-md-6 col-xl-4'>"+
              "<article class='event-default-wrap'>"+
                "<div class='event-default'>"+
                  "<figure class='event-default-image'><img src='images/landing-private-airlines-01-570x370.jpg' alt=' width= 570 height= 370'/>"+
                  "</figure>"+
                  "<div class='event-default-caption'><a class='button button-xs button-secondary button-nina' href='#'>learn more</a></div>"+
                "</div>"+
                "<div class='event-default-inner'>"+
                 " <h5><a class='event-default-title' href='#'>France, Paris</a></h5><span class='heading-5'>from $280</span>"+
                "</div>"+
              "</article"+
            "</div>"
      );
      
      $("#tourviewgrup").html(html);
}


