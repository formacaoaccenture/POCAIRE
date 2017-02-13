sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"

], function(Controller, JSONModel) {
	"use strict";
	return Controller.extend("POCAIRE.controller.hour_man", {

		onInit: function() {
			var oModel = new JSONModel();
			//sap.ui.getCore().byId("resourcesman").setModel(oModel);
			
			var hoursManagement = sap.ui.getCore().getModel("oUser").getProperty("/user/hoursManagement15");
			sap.ui.getCore().getModel("oUser").setProperty("/user/hoursManagement", hoursManagement);
		},

		handleViewChange: function(oEvent) {

			var key = oEvent.getSource().mProperties.viewKey;

			switch (key) {
				case "Day":
					var hoursManagement = sap.ui.getCore().getModel("oUser").getProperty("/user/hoursManagementDay");

					sap.ui.getCore().getModel("oUser").setProperty("/user/hoursManagement", hoursManagement);

					sap.ui.getCore().getModel("oUser").refresh();
					break;

				case "Hour":

					var hoursManagement = sap.ui.getCore().getModel("oUser").getProperty("/user/hoursManagement15");

					sap.ui.getCore().getModel("oUser").setProperty("/user/hoursManagement", hoursManagement);
					sap.ui.getCore().getModel("oUser").refresh();
					break;

				case "Month":
					var hoursManagement = sap.ui.getCore().getModel("oUser").getProperty("/user/hoursManagementMonth");

					sap.ui.getCore().getModel("oUser").setProperty("/user/hoursManagement", hoursManagement);
					sap.ui.getCore().getModel("oUser").refresh();
					break;
			}
		},

		selectBox: function(oEvent) {
            
			var select = oEvent.getSource().getSelectedKey();

			switch (select) {
				case "resources":

					//	var nameProject = sap.ui.getCore().getModel("oUser").getProperty("/user/teamMembers");
					sap.ui.getCore().byId("select").bindItems({

						path: "gestao_horas>/",

						template: new sap.ui.core.Item({
						    key: "{gestao_horas>userID}",
							text: "{gestao_horas>username}"
						})
					});
					
			
					
				//	sap.ui.getCore().byId("select").setSelectedItem("/0");
					//sap.ui.getCore().getModel("oUser").setProperty("/user/teamMembers", nameProject);

					break;

				case "clients":

					//		var nameProject1 = sap.ui.getCore().getModel("oUser").getProperty("/user/projects");
					/*oEvent.getSource().bindItems("{oUser>/user/projects}");*/
					sap.ui.getCore().byId("select").bindItems({

						path: "gestao_horas>/",

						template: new sap.ui.core.Item({
						    key: "{gestao_horas>projectId}",
							text: "{gestao_horas>projectName}"
						})
					});
					
				//	sap.ui.getCore().byId("select").setSelectedItem("/0");
					//sap.ui.getCore().getModel("oUser").setProperty("/user/teamMembers", nameProject1);
	        
	                
					break;

			}
	
		}
		

	});
});