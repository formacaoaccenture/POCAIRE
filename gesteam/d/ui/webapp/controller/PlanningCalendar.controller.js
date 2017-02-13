sap.ui.define(['sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	],
	function(Controller, JSONModel) {
		"use strict";
		var teamMemberPlusAbsenseRequest;
		//	var PageController = Controller.extend("sap.m.sample.PlanningCalendarMulti.Page",{

		var totalDB;
		var rowPlusCombo;
		var user_Type = new Array();
		var arrayType = new Array();
		var user_StartDate = new Array();
		var arrayStartDate = new Array();
		var user_EndDate = new Array();
		var arrayEndDate = new Array();
		var user_Comment = new Array();
		var arrayComment = new Array();
		var user_FirstName = new Array();
		var arrayFirstName = new Array();
		var user_LastName = new Array();
		var arrayLastName = new Array();
		var user_UserID = new Array();
		var arrayUserID = new Array();
		var user_Status = new Array();
		var arrayStatus = new Array();
		var user_currentComment = new Array();
		var arrayCurrentComment = new Array();
		var user_currentDateInterval = new Array();
		var arrayCurrentDateInterval = new Array();
		var user_TableID = new Array();
		var arrayTableID = new Array();

		var PageController = Controller.extend("POCAIRE.controller.PlanningCalendar", {

			onInit: function() {
				var listaFragment = sap.ui.getCore().byId("fragmentContainer").getItems()[0];
				listaFragment.setVisible(false);

				//Create model to fill approval status combobox
				var oApprovalStatus = {
					approvalStatus: [{
							status: "approved",
							action: "Approve"
					},
						{
							status: "rejected",
							action: "Reject"

					}]
				};
				var oModel = new sap.ui.model.json.JSONModel(oApprovalStatus);
				sap.ui.getCore().getModel("oViewController").getProperty("/viewController").getView().setModel(oModel, "oApprovalStatus");

				//
				totalDB = sap.ui.getCore().getModel("absencesDates").oData;
				var current_user;

				for (var i = 0; i < totalDB.length; i++) {
					current_user = totalDB[i].UserID;
					if (i == 0) {
						user_FirstName.push(totalDB[i].FirstName);
						user_LastName.push(totalDB[i].LastName);
						user_UserID.push(totalDB[i].UserID);
						user_Type.push(totalDB[i].Type);
						user_StartDate.push(totalDB[i].StartDate);
						user_EndDate.push(totalDB[i].EndDate);
						user_Comment.push(totalDB[i].Comment);
						user_Status.push(totalDB[i].Status);
						user_TableID.push(totalDB[i].TableID);
						user_currentComment.push("");
						user_currentDateInterval.push("");
					} else if (current_user == totalDB[i - 1].UserID) {
						user_FirstName.push(totalDB[i].FirstName);
						user_LastName.push(totalDB[i].LastName);
						user_UserID.push(totalDB[i].UserID);
						user_Type.push(totalDB[i].Type);
						user_StartDate.push(totalDB[i].StartDate);
						user_EndDate.push(totalDB[i].EndDate);
						user_Comment.push(totalDB[i].Comment);
						user_Status.push(totalDB[i].Status);
						user_TableID.push(totalDB[i].TableID);
						user_currentComment.push("");
						user_currentDateInterval.push("");

					} else {

						arrayFirstName.push(user_FirstName);
						user_FirstName = [];
						arrayLastName.push(user_LastName);
						user_LastName = [];
						arrayUserID.push(user_UserID);
						user_UserID = [];
						arrayType.push(user_Type);
						user_Type = [];
						arrayStartDate.push(user_StartDate);
						user_StartDate = [];
						arrayEndDate.push(user_EndDate);
						user_EndDate = [];
						arrayComment.push(user_Comment);
						user_Comment = [];
						arrayStatus.push(user_Status);
						user_Status = [];
						arrayTableID.push(user_TableID);
						user_TableID = [];
						arrayCurrentComment.push("");
						user_currentComment = [];
						arrayCurrentDateInterval.push("");
						user_currentDateInterval = [];

						user_FirstName.push(totalDB[i].FirstName);
						user_LastName.push(totalDB[i].LastName);
						user_UserID.push(totalDB[i].UserID);
						user_Type.push(totalDB[i].Type);
						user_StartDate.push(totalDB[i].StartDate);
						user_EndDate.push(totalDB[i].EndDate);
						user_Comment.push(totalDB[i].Comment);
						user_Status.push(totalDB[i].Status);
						user_TableID.push(totalDB[i].TableID);
						user_currentComment.push("");
						user_currentDateInterval.push("");
					}

				}

				var oData = [];
				var allTypes = [];
				

				var data = [];

				for (var ii = 0; ii < arrayFirstName.length; ii++) {

					for (var jj = 0; jj < arrayType[ii].length; jj++) {
						allTypes.push({
							Type: arrayType[ii][jj]
							//StartDate: arrayStartDate[ii][jj],
							//EndDate: arrayEndDate[ii][jj]
						});

					}

					data = {
						FirstName: arrayFirstName[ii][0],
						LastName: arrayLastName[ii][0],
						CurrentComment: arrayCurrentComment[ii][0],
						CurrentDateInterval: arrayCurrentDateInterval[ii][0],
						UserID: arrayUserID[ii][0],
						Type: allTypes,
						Comment: arrayComment[ii],
						//Type: arrayType[ii],
						StartDate: arrayStartDate[ii],
						EndDate: arrayEndDate[ii],
						Status: arrayStatus[ii],
						TableID: arrayTableID[ii]
					};
					oData.push(data);
					allTypes = [];
				}

				var jsondata = new sap.ui.model.json.JSONModel(oData);
				sap.ui.getCore().byId("listaDeTable").setModel(jsondata, "newAbsencesDates");

			},

			blockComboBoxInput: function(oEvent) {
				var numberOfRows = sap.ui.getCore().byId("listaDeTable").getVisibleRowCount();

				for (var m = 0; m < numberOfRows; m++) {
					sap.ui.getCore().byId("listaDeTable").getRows()[m].$().find("input").attr("readonly", true);

				}

			},

			handleAppointmentSelect: function(oEvent) {
				var oAppointment = oEvent.getParameter("appointment");
				if (oAppointment) {
					alert("Appointment selected: " + oAppointment.getTitle());
				} else {
					var aAppointments = oEvent.getParameter("appointments");
					var sValue = aAppointments.length + " Appointments selected";
					alert(sValue);
				}
			},

			handleIntervalSelect: function(oEvent) {
				var oPC = oEvent.oSource;
				var oStartDate = oEvent.getParameter("startDate");
				var oEndDate = oEvent.getParameter("endDate");
				var oRow = oEvent.getParameter("row");
				var oSubInterval = oEvent.getParameter("subInterval");
				var oModel = this.getView().getModel();
				var oData = oModel.getData();
				var iIndex = -1;
				var oAppointment = {
					start: oStartDate,
					end: oEndDate,
					title: "new appointment",
					type: "Type09"
				};

				if (oRow) {
					iIndex = oPC.indexOfRow(oRow);
					oData.people[iIndex].appointments.push(oAppointment);
				} else {
					var aSelectedRows = oPC.getSelectedRows();
					for (var i = 0; i < aSelectedRows.length; i++) {
						iIndex = oPC.indexOfRow(aSelectedRows[i]);
						oData.people[iIndex].appointments.push(oAppointment);
					}
				}

				oModel.setData(oData);

			},

			onPress1: function(oEvent) {

				var listaFragment = sap.ui.getCore().byId("fragmentContainer").getItems()[1];
				listaFragment.setVisible(true);

				var listaFragment2 = sap.ui.getCore().byId("fragmentContainer").getItems()[0];
				listaFragment2.setVisible(false);

			},

			onPress2: function(oEvent) {

				var listaFragment = sap.ui.getCore().byId("fragmentContainer").getItems()[1];
				listaFragment.setVisible(false);

				var listaFragment2 = sap.ui.getCore().byId("fragmentContainer").getItems()[0];
				listaFragment2.setVisible(true);

			},

			onComboBoxTypeChange: function(oEvent) {

				var selectionPath = oEvent.mParameters.selectedItem.sId;
				var arraySelectionPath = selectionPath.split("-");
				var rowSelected = arraySelectionPath[3].split("row");
				var rowSelected = rowSelected[1];
				var comboSelected = arraySelectionPath[4];

				var comment = sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").getProperty("/" + rowSelected + "/Comment/" +
					comboSelected + "/");
				sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").setProperty("/" + rowSelected + "/CurrentComment", comment);

				var startDate = sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").getProperty("/" + rowSelected + "/StartDate/" +
					comboSelected + "/");
				var endDate = sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").getProperty("/" + rowSelected + "/EndDate/" +
					comboSelected + "/");
				var currentDateInterval = startDate + " to " + endDate;

				sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").setProperty("/" + rowSelected + "/CurrentDateInterval",
					currentDateInterval);

				sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").refresh();

				rowPlusCombo = new Array(rowSelected, comboSelected);
				
				sap.ui.getCore().byId("combostatus").setSelectedKey(null);

			},

			onComboBoxStatusChange: function(oEvent) {
				var approvalType = oEvent.getParameter("selectedItem").mProperties.key;
				var statusSelected
				var tableRowID
				var oInput

				if (approvalType == "approved") { //if "Approve" was selected
					sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").setProperty("/" + rowPlusCombo[0] +
						"/Status/" +
						rowPlusCombo[1] +
						"/", "APPROVED");
					
					statusSelected = sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").getProperty("/" + rowPlusCombo[0] +
						"/Status/" +
						rowPlusCombo[1] +
						"/");	
						
					tableRowID = sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").getProperty("/" + rowPlusCombo[0] + "/TableID/" +
						rowPlusCombo[1] + "/");
					oInput = {
						statusSelected: statusSelected,
						tableRowID: tableRowID
					};

					editXS(oInput);

				} else if (approvalType == "rejected") { //if "Approve" was selected
					sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").setProperty("/" + rowPlusCombo[0] + "/Status/" + rowPlusCombo[1] +
						"/", "REJECTED");
					statusSelected = sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").getProperty("/" + rowPlusCombo[0] +
						"/Status/" +
						rowPlusCombo[1] +
						"/");
					tableRowID = sap.ui.getCore().byId("listaDeTable").getModel("newAbsencesDates").getProperty("/" + rowPlusCombo[0] + "/TableID/" +
						rowPlusCombo[1] + "/");
					oInput = {
						statusSelected: statusSelected,
						tableRowID: tableRowID
					};

					editXS(oInput);

				}
				
				

			},

			getEnabledComboBox: function(sDateInterval) {
				sap.ui.getCore().byId("listaDeTable").getRows()[0].$().find("input").attr("readonly", true);
				if (sDateInterval) {
					return true;
				} else {
					return false;
				}
			}

		});

		return PageController;

		function editXS(data) {

			var xsURL = "../../services/" + "absencesDates.xsjs";

			//create object
			var jsonData = [];
			jsonData.push({
				statusSelected: data.statusSelected,
				tableRowID: data.tableRowID

			});

			$.ajax({
				type: "PUT",
				url: xsURL,
				data: {
					JSON_DATA: JSON.stringify(jsonData)
				},
				async: false,
				success: function(idata) {
					console.log(idata);
				},

				error: function(error) {
					console.log(error);
				}
			});

		}

	});