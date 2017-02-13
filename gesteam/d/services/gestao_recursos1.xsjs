$.response.contentType = "application/json";
$.response.status = 200;
$.response.contentType = "text/plain";

try{
   /* var schema = ' "ACN_POC_GESTEAM."'; 
    var db = 'gesteamEntities.projects';
    var dbpath = schema + '\"acn.hcm.gesteam.d::' + db + '\" ';*/
    var dbpath = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user" ';
    var jsonString,jsonData;
    switch ( $.request.method ) {
        //Handle your GET calls here
        case $.net.http.GET:
            selectData(dbpath);
            break;
        //Handle your PUT calls here
        case $.net.http.PUT:
             //get data from post
            jsonString = $.request.parameters.get("JSON_DATA");    
            //$.response.setBody($.request.parameters.get("JSON_DATA").toString());
            jsonData = JSON.parse(jsonString);
            editData(jsonData[0] , dbpath);
            break;            
        default:
            break;
    }
} catch (err) {
    $.response.setBody("Failed to execute action: " + err.toString());
}

function editData(data, directory){
    
    try{
        //vars: from, to, subject, details
        var conn = $.db.getConnection();  

        //using "values(???)" and set it afterwards is recommended to protect against sql injection
        var pstmt = conn.prepareStatement("UPDATE" + directory +
                                          "SET " + '"level"'+"=?" +
                                          ", "+'"ext"'+ "=?" +
                                          ", "+'"local"'+ "=?" +
                                          " WHERE "+ '"username"' + "=?");

        
        pstmt.setString(1,data.level);
        pstmt.setString(2,data.ext); 
        pstmt.setString(3,data.local);
        pstmt.setString(4,data.username);
        
        pstmt.executeQuery();
        
        pstmt.close();
        conn.commit();
        conn.close();
        
        $.response.contentType = "text/html";
        $.response.setBody("sucess");
        
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
            
            dataLine.username = cursor.getString(3);
            dataLine.role = cursor.getString(5);
            dataLine.ext = cursor.getInteger(11);
            dataLine.local = cursor.getString(12);
            
            
            
            
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



