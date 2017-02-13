sap.ui.define([
	"POCAIRE/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSON) {
	"use strict";
	var controller;
	return Controller.extend("POCAIRE.controller.upload", {

		onPress: function(oEvent) {
			var oDialog = new sap.ui.xmlfragment("POCAIRE.fragment.dialogs.dialog_upload", this);
			var oLabel = oDialog.getContent()[0];
			oLabel.setText("Sucesso");
			oDialog.open();

		},
		onClose: function(oEvent) {
			var oDialog = oEvent.getSource().getParent();
			oDialog.close();
		},

		radiobuttonselect: function(oEvent) {
			var radio = oEvent.getElementById("a").value.selected;
			if (radio === "true") {
				oEvent.getElementById("a").value.selected("false");
			} else {
				oEvent.getElementById("a").value.selected("true");
			}
		}

	});
});