

function getHolaRoss(){
     var objXMLHttpRequest = new XMLHttpRequest();
    objXMLHttpRequest.onreadystatechange = function () {
        if (objXMLHttpRequest.readyState === 4) {
            if (objXMLHttpRequest.status === 200) {
                response = JSON.parse(objXMLHttpRequest.responseText);
                $("#contenido").html(response[0].hola);
            } else {
                alert('Error Code: ' + objXMLHttpRequest.status);
            }
        }
    };
    objXMLHttpRequest.open('GET', 'http://localhost/Tours/?p=holaRoss');
    objXMLHttpRequest.send();
}