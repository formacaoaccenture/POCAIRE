$.response.contentType = "application/json";
$.response.status = 200;
$.response.contentType = "text/plain";

try{
    var jsonString,jsonData;
     var dbpath = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.absencesDates" ';
    var dbpath1 = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user" ';

    switch ( $.request.method ) {
        //Handle your GET calls here
        case $.net.http.GET:
            selectData();
            break;
         case $.net.http.POST:
            //get data from post
            jsonString = $.request.parameters.get("JSON_DATA");    
            //$.response.setBody($.request.parameters.get("JSON_DATA").toString());
            jsonData = JSON.parse(jsonString);
            insertData(jsonData[0] , dbpath);
            break; 
            
        default:
            break;
    } 
}
catch(err){
    $.response.setBody("Failed to execute action: " + err.toString());
}


function insertData(data, directory){
    
    try{
        //vars: from, to, subject, details
        var conn = $.db.getConnection();  

        //using "values(???)" and set it afterwards is recommended to protect against sql injection
        var pstmt = conn.prepareStatement("INSERT INTO" + directory + 
                                          " VALUES(?,?,?,?,?,?,?)");
        
        pstmt.setInteger(1,data.absencesDatesID);
        pstmt.setDate(2,data.startDate);
        pstmt.setDate(3,data.endDate);
        pstmt.setString(4,data.type);
        pstmt.setString(5,data.status);
        pstmt.setString(6,data.comment);
        pstmt.setInteger(7,data.userID);

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

function selectData(){
    
    
    try{
    
        var conn = $.db.getConnection();
        var pstmt = conn.prepareStatement("SELECT * FROM" + dbpath + "," + dbpath1 + " WHERE "+ dbpath + ".\"userID\" = 69 AND " + dbpath + ".\"userID\" = " + dbpath1 + ".\"userID\"");
        var dataLine, dbData = [];
        var cursor = pstmt.executeQuery();
        while (cursor.next()){
            dataLine = {};

        
            dataLine.startDate = cursor.getDate(2);
            dataLine.endDate = cursor.getDate(3);
            dataLine.type = cursor.getString(4);
            dataLine.Status = cursor.getString(5);
            dataLine.comment = cursor.getString(6);
            
            dataLine.firstName = cursor.getString(14);
            dataLine.lastName = cursor.getString(15);
            dataLine.totalHolidays = cursor.getInteger(16);
            dataLine.compensation = cursor.getInteger(17);
            
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


