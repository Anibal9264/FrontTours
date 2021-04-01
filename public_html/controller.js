
function SearchTour(){
    var parametros = {
                "p": "SearchTour",
                "search" : "anibal",
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
                      alert(r[0].nombre);
                }
        });
        
}