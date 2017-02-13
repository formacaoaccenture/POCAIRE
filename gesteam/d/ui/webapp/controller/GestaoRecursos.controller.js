sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var controller;
	var selectedObject;

	return Controller.extend("POCAIRE.controller.GestaoRecursos", {
		onInit: function() {
			controller = this;

		},

		onPress: function(oEvent) {

			var oteste = oEvent.getSource().getPressed();

			var ofragment1 = sap.ui.getCore().byId("oTabela1");
			var ofragment2 = sap.ui.getCore().byId("oTabela2");
			// var oboxnav =this.getView().byId("boxnav");
			if (oteste === true) {
				ofragment2.setVisible(true);
				// oboxnav.setVisible(true);
				ofragment1.setVisible(false);
			} else {
				ofragment1.setVisible(true);
				ofragment2.setVisible(false);
				//oboxnav.setVisible(false);
			}
		},

		btn_resSave: function() {

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
		onSave: function(oEvent) {
            	//get selected line number
			var sPath = oEvent.getSource().getBindingContext("gestao_recursos1").getPath(); // "user/projects/4"
			selectedObject = sap.ui.getCore().getModel("gestao_recursos1").getObject(sPath);

			editXS(selectedObject);

		}

	});


	
	function editXS(data) {
	    
        var xsURL = "../../services/" +  "gestao_recursos1.xsjs";
		
		//create object
		var jsonData = [];
		jsonData.push({
			username: data.username,
			level: data.level,
			ext: data.ext,
			local: data.local
		/*	projectID: data.projectID,
			startDate: data.startDate,
			endDate: data.endDate,
			status1: data.status1*/
		});


        $.ajax({
			    type: "PUT",
			    url: xsURL,
			    data: {JSON_DATA: JSON.stringify(jsonData)},
			    async: false,
			    success: function(idata) {
                    console.log(idata);
                    
                    //insert data into model
        			// this works because the selected object is a pointer (and not a new object)
        			selectedObject.level = data.level;
        			selectedObject.ext = data.ext;
        			selectedObject.local = data.local;
        			selectedObject.username = data.username;
        			//refresh model to update table
        			sap.ui.getCore().byId("oTabela1").getModel("gestao_recursos1").refresh();
                    
			    }, 
			    
			    error: function(error) {
			        console.log(error);
			    }
		     });
		     

	}
	

	
	/*	function insertXS(odata) {

		var xsURL = "../../services/" + "gestao_recursos1.xsjs";

		var jsonData = [];

		jsonData.push({
			role: odata.username,
			ext: odata.ext,
			local: odata.local
		});

		
		$.ajax({
			type: "POST",
		    url: xsURL,
			data: {JSON_DATA: JSON.stringify(jsonData)},
			async: false,
			success: function(idata) {
				console.log(idata);

				//insert data into model
				var oData = sap.ui.getCore().getModel("gestao_recursos1").getData();
				oData.push(odata);
				//refresh model to update table values 
				sap.ui.getCore().getModel("gestao_recursos1").refresh();

			},
			error: function(error) {
				console.log(error);
			}
		});

	}*/
	
});