sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	//define global variables that can be accessed anytime
	var controller;
	var addDialog;
	var editDialog;
	var editLine;
	var selectObject;
	var modelo =	jsonData.push({
			projectId: data.projectId,
			clientId: data.clientId,
			idPSupervisor: data.idPSupervisor,
			projectName: data.projectName,
			WBS: data.WBS
		});
	return Controller.extend("POCAIRE.controller.team_wbs", {

		// Define what happens when the view is open
		onInit: function() {

			controller = this;

			//{parts:[{path:'MODEL>FIELD/INDEX'},path:'MODEL>FIELD/INDEX'}, formatter:'prototype3.utils.Formatting'}]}
			//var x= this.getParent().getModel("oUser").getData().user;
			// Model for the table. Right now is empty because we dont want any entries. 
			//	var oModel = new sap.ui.model.json.JSONModel([]);
			//	sap.ui.getCore().byId("team_wbs").setModel(oModel, "oModel");
		},

		getInputAdd: function() {
			return sap.ui.getCore().byId("team_wbs").byId("input_project");
		},

		onClickAdd: function() {

			//initiate add dialog
			var oDialog = new sap.ui.xmlfragment("POCAIRE.fragment.dialogs.dialogAdd", this);

			//model from dialog is the same as the main view ( this is needed to enable 18n access)
			sap.ui.getCore().byId("team_wbs").addDependent(oDialog);

			// enable the dialog to be accessed from anywhere !
			addDialog = oDialog;

			//show dialog
			oDialog.open();
		},

		onOk: function() {

			// get values from the input fields
			var iprojectId = sap.ui.getCore().byId("input_projectId").getValue();
			var iWBS = sap.ui.getCore().byId("input_wbs").getValue();
			var iclientId = sap.ui.getCore().byId("input_clientId").getValue();
			var iidPSupervisor = sap.ui.getCore().byId("input_IdSupervisor").getValue();
			var iprojectName = sap.ui.getCore().byId("input_projectName").getValue();
 

			// create object from inputs
			var oInput = {
				projectId:  parseFloat(iprojectId),
    			clientId:  parseFloat(iclientId),
    			idPSupervisor:  parseFloat(iidPSupervisor),
    			projectName: iprojectName,
    			WBS: iWBS
			};
            
		
			
            //send data to DB
			insertXS(oInput);

			//close dialog
			addDialog.close();

			//destroy the dialog to avoid id replication
			addDialog.destroy(true);
		},

		onAddClose: function() {

			//close dialog 
			addDialog.close();

			//destroy the dialog to avoid id replication
			addDialog.destroy(true);
		},

		onClickEdit: function(oEvent) {

			// create edit dialog
			var oEditDialog = new sap.ui.xmlfragment("POCAIRE.fragment.dialogs.dialogEdit", this);

			//model from dialog is the same as the main view ( this is needed to enable 18n access)
			sap.ui.getCore().byId("team_wbs").addDependent(oEditDialog);

			//save dialog to be accessed from other places
			editDialog = oEditDialog;

			//get selected line number
			var sPath = oEvent.getSource().getBindingContext("WBS").getPath(); // "user/projects/4"
			selectObject = sap.ui.getCore().getModel("WBS").getObject(sPath);

			//save selected line number to be accessed from other places
			editLine = sPath;

			//set selected line values in input fields of edit dialog box
			//IMPORTANT
			// YOU CAN USE SAP UI GETCORE TO GET FRAGMENT'S INPUT FIELDS BY ID BECAUSE THATS THE ID IN WHICH THEY ARE SAVED IN THE CORE. 
			//THIS DOES NOT APPLY TO VIEWS !! YOU CAN ONLY USE THIS WITH FRAGMENTS
			sap.ui.getCore().byId("input_projectId").setValue(selectObject.projectId);
			sap.ui.getCore().byId("input_wbs").setValue(selectObject.WBS);
            sap.ui.getCore().byId("input_clientId").setValue(selectObject.clientId);
			sap.ui.getCore().byId("input_IdSupervisor").setValue(selectObject.idPSupervisor);
            sap.ui.getCore().byId("input_projectName").setValue(selectObject.projectName);
	

			//show dialog	
			oEditDialog.open();
		},

		/* onEditOk: function() {
            
		// get values from the input fields
			var iprojectId = sap.ui.getCore().byId("input_projectId").getValue();
			var iWBS = sap.ui.getCore().byId("input_wbs").getValue();
			var iclientId = sap.ui.getCore().byId("input_clientId").getValue();
			var iidPSupervisor = sap.ui.getCore().byId("input_IdSupervisor").getValue();
			var iprojectName = sap.ui.getCore().byId("input_projectName").getValue();
 

			// create object from inputs
			var oInput = {
				projectId:  parseFloat(iprojectId),
    			clientId:  parseFloat(iclientId),
    			idPSupervisor:  parseFloat(iidPSupervisor),
    			projectName: iprojectName,
    			WBS: iWBS
			}; */
            
	
            editXS(oInput);

			//close
			editDialog.close();
			editDialog.destroy(true);

		},

		onEditClose: function() {

			//close
			editDialog.close();
			editDialog.destroy(true);
		}

	});

	function insertXS(data) {
	    
        var xsURL = "../../services/" +  "WBS.xsjs";
		
		var jsonData = [];

		var modelo;

        // send data to <xsURL>service
	    /*$.post(
		    xsURL, 
		    {JSON_DATA: JSON.stringify(jsonData)
		    }
		    ).done(function(data) {
			console.log(data);
		});*/
        debugger;
        $.ajax({
			    type: "POST",
			    url: xsURL,
			    data: {JSON_DATA: JSON.stringify(jsonData)},
			    async: false,
			    success: function(idata) {
                    console.log(idata);
                    
                    //insert data into model
                    var oData = sap.ui.getCore().getModel("WBS").getData();
                    oData.push(data);
                    //refresh model to update table values 
        			sap.ui.getCore().getModel("WBS").refresh();
        			
			    }, error: function(error) {
			        console.log(error);
			    }
		     });
		     

	}



	function editXS(data) {
	    
        var xsURL = "../../services/" +  "WBS.xsjs";
		
		//create object
		var jsonData = [];

		var modelo;

        $.ajax({
			    type: "PUT",
			    url: xsURL,
			    data: {JSON_DATA: JSON.stringify(jsonData)},
			    async: false,
			    success: function(idata) {
                    console.log(idata);
                    
                    //insert data into model
        			// this works because the selected object is a pointer (and not a new object)
        			selectObject.projectName = data.projectName;
        			selectObject.WBS = data.WBS;
        			
        			//refresh model to update table
        			sap.ui.getCore().byId("team_wbs").getModel("WBS").refresh();
                    
			    }, 
			    
			    error: function(error) {
			        console.log(error);
			    }
		     });
		     

	}
	
});