sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSON) {
	"use strict";
	return Controller.extend("POCAIRE.controller.BaseController", {
		
		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);
		}
		
	});
});