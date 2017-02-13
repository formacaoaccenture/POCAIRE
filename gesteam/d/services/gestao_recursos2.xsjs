$.response.contentType = "application/json";
$.response.status = 200;
$.response.contentType = "text/plain";

try{
   /* var schema = ' "ACN_POC_GESTEAM."'; 
    var db = 'gesteamEntities.projects';
    var dbpath = schema + '\"acn.hcm.gesteam.d::' + db + '\" ';*/
    var dbpath = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user " ';
    var dbpath1 = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.projects" ';

    switch ( $.request.method ) {
        //Handle your GET calls here
        case $.net.http.GET:
            selectData(dbpath);
            break;
        //Handle your PUT calls here
        case $.net.http.PUT:
           
            break;            
        default:
            break;
    }
} catch (err) {
    $.response.setBody("Failed to execute action: " + err.toString());
}


function selectData(directory){
    
    try{
        var conn = $.db.getConnection();
        //var pstmt = conn.prepareStatement("SELECT" + directory + '".projectName",' + directory +'".WBS" FROM' + directory );
        var pstmt = conn.prepareStatement("SELECT * FROM" + directory);
        var dataLine, dbData = [];
        var cursor = pstmt.executeQuery();
        while (cursor.next()){
            dataLine = {};
      /*      dataLine.MSG_FROM = cursor.getInteger(1);
            dataLine.MSG_FROM = cursor.getInteger(2);
            dataLine.MSG_FROM = cursor.getInteger(3);*/
            dataLine.userID = cursor.getString(1);
            dataLine.projectID = cursor.getString(2);
            
            dataLine.projectName = cursor.getString(3);
            
            
            
            
            dbData.push(dataLine);
        }
        
        pstmt.close();
        conn.commit();
        conn.close();
        
        $.response.contentType = "application/json";  
        $.response.setBody(JSON.stringify(dbData));  
        
    }
    catch(err){
        if (pstmt !== undefined){
            pstmt.close();
        }
        if (conn !== undefined){
            conn.close();
        }
        
        //check error message
        $.response.contentType = "text/html";
        $.response.setBody(err.message);
    }
}



