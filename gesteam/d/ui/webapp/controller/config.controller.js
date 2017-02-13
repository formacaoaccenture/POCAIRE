sap.ui.define([
	"POCAIRE/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSON) {
	"use strict";
	var controller;

	return Controller.extend("POCAIRE.controller.config", {
		
		onPress: function(oEvent) {
			var oDialog = new sap.ui.xmlfragment("POCAIRE.fragment.dialogs.dialog_config", this);
			var nome_botao= oEvent.getSource().getId();
			var nome= oEvent.getSource().getText();
			var oLabel = oDialog.getContent()[0];
			oLabel.setText(nome + " pressed ");
			sap.ui.getCore().byId("config").addDependent(oDialog);
			oDialog.open();

		},
		onClose: function(oEvent) {
			var oDialog = oEvent.getSource().getParent();
			oDialog.close();
		}

	});
});