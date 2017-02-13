$.response.contentType = "application/json";
$.response.status = 200;
$.response.contentType = "text/plain";

try{
    var dbpath = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.projects" ';
  var jsonString,jsonData;
    switch ( $.request.method ) {
        //Handle your GET calls here
        case $.net.http.GET:
            selectData( dbpath);
            break;
    
    
        case $.net.http.POST:
            //get data from post
            jsonString = $.request.parameters.get("JSON_DATA");    
            //$.response.setBody($.request.parameters.get("JSON_DATA").toString());
            jsonData = JSON.parse(jsonString);
            insertData(jsonData[0] , dbpath);
            break; 
            
            
        case $.net.http.PUT:
            //get data from post
            jsonString = $.request.parameters.get("JSON_DATA");    
            //$.response.setBody($.request.parameters.get("JSON_DATA").toString());
            jsonData = JSON.parse(jsonString);    
            
            editData(jsonData[0],  dbpath);
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
                                          "SET " + '"projectName"'+"=?" +
                                          ", "+'"WBS"'+ "=?" +
                                          " WHERE "+ '"projectId"' + "=?");

        
        pstmt.setString(1,data.projectName);
        pstmt.setString(2,data.WBS);
        pstmt.setInt(3,data.projectId);
       // pstmt.setInt(4,data.clientId);
        
        pstmt.executeQuery();
        
        pstmt.close();
        conn.commit();
        conn.close();
        
        $.response.contentType = "text/html";
        $.response.setBody("Database updated successfully");
        
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

function insertData(data, directory){
    
    try{
        //vars: from, to, subject, details
        var conn = $.db.getConnection();  

        //using "values(???)" and set it afterwards is recommended to protect against sql injection
        var pstmt = conn.prepareStatement("INSERT INTO" + directory + 
                                          " VALUES(?,?,?,?,?)");
        
        pstmt.setInteger(1,data.projectId);
        pstmt.setInteger(2,data.clientId);
        pstmt.setInteger(3,data.idPSupervisor);
        pstmt.setString(4,data.projectName);
        pstmt.setString(5,data.WBS);

        pstmt.execute();
        pstmt.close();
        conn.commit();
        conn.close();
        
        $.response.contentType = "text/html";
        $.response.setBody("Entry inserted successfully");
        
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
        var pstmt = conn.prepareStatement("SELECT * FROM" + directory);
        var dataLine, dbData = [];
        var cursor = pstmt.executeQuery();
        while (cursor.next()){
            dataLine = {};
            
            dataLine.projectId = cursor.getInteger(1);
            dataLine.clientId = cursor.getInteger(2);
            dataLine.idPSupervisor = cursor.getInteger(3);
            dataLine.projectName = cursor.getString(4);
            dataLine.WBS = cursor.getString(5);
            
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



