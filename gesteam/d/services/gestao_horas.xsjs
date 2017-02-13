$.response.contentType = "application/json";
$.response.status = 200;
$.response.contentType = "text/plain";

try {
	var dbpathAssignments = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.Assignments"';
	var dbpathProjects = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.projects"';
	var dbpathUser = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user"';
	//       var dbKey = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user"';

	switch ($.request.method) {

		case $.net.http.GET: //Handle your GET calls here
			selectData(dbpathAssignments, dbpathProjects, dbpathUser);
			//            selectOp(dbKey);
			break;

		case $.net.http.PUT: //Handle your PUT calls here
			break;
		default:
			break;
	}

} catch (err) {
	$.response.setBody("Failed to execute action: " + err.toString());
}
/*function selectOp(key){
    try{
        var conn = $.db.getConnection();
        var pstmt=conn.prepareStatement("Select "+   "From");
        
        
    }
}*/
function selectData(directoryAssignments, directoryProjects, directoryUser) { // Get data from tables

	try {

		var conn = $.db.getConnection();
		var dbpath = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.projects" ';

		// Entrada de parametros

		var pstmt = conn.prepareStatement("SELECT" + '"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.projects"."projectName",' +
			'"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.Assignments"."hours",' +
			'"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.Assignments"."date",' +
			'"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user"."userID",' +
			'"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user"."username",' +
			'"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.projects"."projectId"' +
			"FROM" + '"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.projects"' +
			"inner JOIN" + '"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.Assignments"' +
			"ON" +
			'"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.projects"."projectId"="ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.Assignments"."projectID"' +
			"inner join" + '"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user"' +
			"on" +
			'"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.Assignments"."userID"="ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user"."userID"'
			// +  "WHERE" + '"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user"."userID"=65 '
			// + " AND "
			// + '"ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.projects"."projectId"=18'

			// Entrada de parametros
		);
		var dataLine, dbData = [];
		var cursor = pstmt.executeQuery();
		var aux = 0;

		while (cursor.next()) {
			dataLine = {};
			dataLine.projectName = cursor.getString(1);
			aux = aux + cursor.getInteger(2);
			dataLine.hours = cursor.getInteger(2);
			//dataLine.hours=cursor.getInteger(2);
			dataLine.date = cursor.getString(3);
			dataLine.userID = cursor.getInteger(4);
			dataLine.username = cursor.getString(5);
			dataLine.projectId = cursor.getInteger(6);
			dbData.push(dataLine);
		}

		pstmt.close();
		conn.commit();
		conn.close();

		$.response.contentType = "application/json";
		$.response.setBody(JSON.stringify(dbData));
		//  $.trace.info("hours:" + $.response.setbody(aux));
		//  $.response.setBody(aux); 

	} catch (err) {
		if (pstmt !== undefined) {
			pstmt.close();
		}
		if (conn !== undefined) {
			conn.close();
		}
		//check error message
		$.response.contentType = "text/html";
		$.response.setBody(err.message);
	}
}