$.response.contentType = "application/json";
$.response.status = 200;
$.response.contentType = "text/plain";


 
//Implementation of GET call
function fnHandleGet() {
    return {"myResult":"success1"};
}

//Implementation of PUT call
function fnHandlePut() {
    return {"myStatus":"success1"};
}

try {
    switch ( $.request.method ) {
        //Handle your GET calls here
        case $.net.http.GET:
            $.response.setBody(JSON.stringify(fnHandleGet()));
            break;
        //Handle your PUT calls here
        case $.net.http.PUT:
            $.response.setBody(JSON.stringify(fnHandlePut()));
            break;            
        default:
            break;
    }
} catch (err) {
    $.response.setBody("Failed to execute action: " + err.toString());
}