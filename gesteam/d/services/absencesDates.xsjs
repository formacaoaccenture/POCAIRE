$.response.contentType = "application/json";
$.response.status = 200;
$.response.contentType = "text/plain";

try {
	/* var schema = ' "ACN_POC_GESTEAM."'; 
    var db = 'gesteamEntities.projects';
    var dbpath = schema + '\"acn.hcm.gesteam.d::' + db + '\" ';*/
	var dbpath = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.user" ';
	var dbpath2 = ' "ACN_POC_GESTEAM"."acn.hcm.gesteam.d::gesteamEntities.absencesDates" ';
	var jsonString, jsonData;

	switch ($.request.method) {
		//Handle your GET calls here
		case $.net.http.GET:
			selectData(dbpath, dbpath2);
			break;
			//Handle your PUT calls here
		case $.net.http.PUT:

			//get data from post
			jsonString = $.request.parameters.get("JSON_DATA");
			//$.response.setBody($.request.parameters.get("JSON_DATA").toString());
			jsonData = JSON.parse(jsonString);

			editData(jsonData[0], dbpath2);

			break;
		default:
			break;
	}
} catch (err) {
	$.response.setBody("Failed to execute action: " + err.toString());
}

function selectData(user, absenceDates) {

	try {
		var conn = $.db.getConnection();
		
		//var pstmt = conn.prepareStatement("SELECT" + directory + '".projectName",' + directory +'".WBS" FROM' + directory );
		var pstmt = conn.prepareStatement('select' + user + '."userID",' + user + '."firstName", ' + user + '."lastName",' + absenceDates +
			'."type", ' + absenceDates + '."startDate",' + absenceDates + '."endDate",' + absenceDates + '."comment",' + absenceDates +
			'."status", ' + absenceDates + '."absencesDatesID"  from ' + user + ' inner join ' + absenceDates + ' on ' + user + '."userID" = ' +
			absenceDates + '."userID" where' + absenceDates + '."status" =? order by' + user + '."userID"');

		//' + user + '."firstName", ' + user + '."lastName",' + absenceDates +
		//		'."type", ' + absenceDates + ' ."startDate", ' + absenceDates + ' ."endDate",' + absenceDates + '."comment", ' + absenceDates +
		//		' ."status" FROM ' + user + '  inner join  ' + absenceDates + '  on ' + user + '."userID"=' + absenceDates +
		//		' ."userID");
		pstmt.setString(1, 'PENDING');
		var dataLine, dbData = [];
		var cursor = pstmt.executeQuery();
		while (cursor.next()) {
			dataLine = {};
			/*      dataLine.MSG_FROM = cursor.getInteger(1);
            dataLine.MSG_FROM = cursor.getInteger(2);
            dataLine.MSG_FROM = cursor.getInteger(3);*/

			dataLine.UserID = cursor.getInteger(1);
			dataLine.FirstName = cursor.getString(2);
			dataLine.LastName = cursor.getString(3);
			dataLine.Type = cursor.getString(4);
			dataLine.StartDate = cursor.getString(5);
			dataLine.EndDate = cursor.getString(6);
			dataLine.Comment = cursor.getString(7);
			dataLine.Status = cursor.getString(8);
			dataLine.TableID = cursor.getString(9);
			

			dbData.push(dataLine);
		}

		pstmt.close();
		conn.commit();
		conn.close();

		$.response.contentType = "application/json";
		$.response.setBody(JSON.stringify(dbData));

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

function editData(data, absenceDates) {

	try {
		//vars: from, to, subject, details
		var conn = $.db.getConnection();

		//using "values(???)" and set it afterwards is recommended to protect against sql injection
		var pstmt = conn.prepareStatement('UPDATE' + absenceDates + 'SET "status"=? WHERE "absencesDatesID"=?');

		pstmt.setString(1, data.statusSelected);
		pstmt.setString(2, data.tableRowID);

		pstmt.executeQuery();

		pstmt.close();
		conn.commit();
		conn.close();

		$.response.contentType = "text/html";
		$.response.setBody("Database updated successfully");

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