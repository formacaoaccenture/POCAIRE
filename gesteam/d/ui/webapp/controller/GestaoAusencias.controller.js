sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/unified/DateRange",
	'sap/ui/unified/CalendarLegendItem',
	"POCAIRE/model/formatter"
], function(Controller) {
"use strict";
var ausencias;
var controller;
var botao = 1;
var oModel;




			var horaInicio = sap.ui.getCore().byId("horaInicio");
			var horaFim = sap.ui.getCore().byId("horaFim");









return Controller.extend("POCAIRE.controller.GestaoAusencias", {
	onInit: function() {
		//estou a ir buscar o modelo que esta  na view principal
		oModel = sap.ui.getCore().getModel("absenceDatesCollaborator");
		controller = this;
		//estou a chamar a funcao no inicio porque quero que apresente ja os dados que estao no modelo criado
		var oCalendar = sap.ui.getCore().byId("calendar");
		//estou a ir buscar a caixa das legendas
		var legenda = sap.ui.getCore().byId("legend1");
		//variavel para conter o array das datas do modelo (ausencias)
		ausencias = oModel.getData();
		
		//ausencia -->DATE1, DATE2 corresponde a cada uma destas datas
		//serve para preencher os campos do calendario definidos no nosso modelo
		for (var i in ausencias) {
			var sType;
			var Leg;
			switch (ausencias[i].type) {
				case "holiday":
					switch (ausencias[i].Status) {
						case "forApproval":
							sType = "Type01";
							Leg = "Holiday for aproval";
							break;
						case "approved":
							sType = "Type02";
							Leg = "Holiday approved";
							break;
						case "notApproved":
							sType = "Type03";
							Leg = "Holiday not Approved";
					}
					break;

				case "training":
					switch (ausencias[i].Status) {
						case "forApproval":
							sType = "Type04";
							Leg = "Training for approval";
							break;
						case "approved":
							sType = "Type05";
							Leg = "Training approved";
							break;
						case "notApproved":
							sType = "Type06";
							Leg = "Training not approved";
							break;

					}
					break;
				case "vacationDay":
					switch (ausencias[i].Status) {
						case "forApproval":
							sType = "Type07";
							Leg = "Vacation Day for approval";
							break;
						case "approved":
							sType = "Type08";
							Leg = "Vacation Day approved";
							break;
						case "notApproved":
							sType = "Type09";
							Leg = "Vacation Day not approved";
					}
					break;
			}
			var existe = 0;
			for (var j in legenda.getItems()) {
				//igual a zero nao existe -->flags
				if (legenda.getItems()[j].getType() === sType) {
					existe = 1;
				}
			}
			if (existe === 0) {
				legenda.addItem(new sap.ui.unified.CalendarLegendItem({
					text: Leg,
					type: sType
				}));
			}
			
			var startYear = ausencias[i].startDate.split("-")[0];
			var startMonth = ausencias[i].startDate.split("-")[1] - 1;
			var startDay =  ausencias[i].startDate.split("-")[2].split("T")[0];
			
			var endYear = ausencias[i].endDate.split("-")[0];
			var endMonth = ausencias[i].endDate.split("-")[1] -1;
			var endDay =  ausencias[i].endDate.split("-")[2].split("T")[0];
			
			var start = new Date(startYear,startMonth,startDay);
			var end = new Date(endYear,endMonth,endDay);

			oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
				startDate: start,
				endDate: end,
				type: sType,
				tooltip: ausencias[i].comment
			}));
		}

	},

	//funçao que abre o dialog
	handleCalendarSelect: function() {
		var oCalendar = sap.ui.getCore().byId("calendar");
		//getSelecteDates[0] corresponde ao intervalo selecionado
		//getEndDate é a data final selecionada
		if (oCalendar.getSelectedDates()[0].getEndDate() !== null) {
			controller.dialogFragment = new sap.ui.xmlfragment("POCAIRE.fragment.dialogs.dialog_Absence", controller);
			sap.ui.getCore().byId("gestaoAusencias").addDependent(controller.dialogFragment);
			controller.dialogFragment.open();

			//para estes campos de input nao aparecerem no momento em que se gera o dialog
			horaInicio.setVisible(false);
			horaFim.setVisible(false);

		}

	},

	onPressFerias: function(event) {

		horaInicio.setVisible(false);
		horaFim.setVisible(false);

		botao = 1;
		//estou a ir ao botao seguinte e a desativa-lo, porque estou a carregar no 1º botao(ferias)
		var button = event.getSource().getParent().getItems()[1];
		button.setPressed(false);
		//estou a ir ao botao pressionado (Ferias) e coloca-lo ativo->true
		event.getSource().setPressed(true);
	},

	onPressFormacao: function(event) {

		horaInicio.setVisible(true);
		horaFim.setVisible(true);

		botao = 2;
		var button = event.getSource().getParent().getItems()[0];
		button.setPressed(false);
		event.getSource().setPressed(true);
	},
	closeDialog: function() {
		controller.dialogFragment.close();
		controller.dialogFragment.destroy(true);
	},

	/*	checkEvent: function() {
				//buscar o calendario
				var oCalendar = sap.ui.getCore().byId("calendar");
				//todas as datas selecionadas do calendario
				var aSelectedDates = oCalendar.getSelectedDates();
				//a data selecionada (a 1º)
				//estou a dividir a data e a buscar o ano, o mes e o dia
				var oYear = oDate.getFullYear();
				var oMonth = oDate.getMonth() + 1;
				if (oMonth < 10) {
					oMonth = "0" + oMonth;
				}
				var oDay = oDate.getDate();
				if (oDay < 10) {
					oDay = "0" + oDay;
				}
				//criar a data formatada 
				var formatData = oYear + oMonth + oDay;
				//estou a procurar o quadrado que contem a data
				var block = $(oCalendar.getDomRef()).find("div[data-sap-day= " + formatData + "]");
				if (botao === 1) {
					block.addClass("eventChecked");
				} else {
					if (botao === 2) {
						block.addClass("newEvent");
					}
				}
				controller.dialogFragment.close();
			}*/
			

			

	//guardar a informaçao dos inputs no modelo
	checkEvent: function() {
		var oCalendar = sap.ui.getCore().byId("calendar");
		var aSelectedDates = oCalendar.getSelectedDates();
		var BeginDate = aSelectedDates[0].getStartDate();
		var EndDate = aSelectedDates[0].getEndDate();
		var legenda = sap.ui.getCore().byId("legend1");
		var sType;
		var Leg;
		//estou a buscar os inputs do dialog
		//var HoraInicio = sap.ui.getCore().byId("horaInicio").getText();
		//var HoraFim = sap.ui.getCore().byId("horaFim").getText();
		var comentario = sap.ui.getCore().byId("coment").getValue();
		var tipo;
		if (botao === 1) {
			tipo = "holiday";
			sType = "Type01";
			Leg = "Holiday for Approval";
		} else {
			tipo = "training";
			sType = "Type04";
			Leg = "Training for Approval";
		}
		//queremos acrescentar este objeto ao modelo --> na propriedade "absenceDates"
		var newAbsence = {
			//id: "DATE" + ausencias.length,
			startDate: BeginDate,
			endDate: EndDate,
			type: tipo,
			status: "forApproval",
			comment: comentario
		};
		
		insertXS(newAbsence);
		
		
		var existe = 0;
		for (var j in legenda.getItems()) {
			//igual a zero nao existe -->flags
			if (legenda.getItems()[j].getType() === sType) {
				existe = 1;
			}
		}
		if (existe === 0) {
			legenda.addItem(new sap.ui.unified.CalendarLegendItem({
				text: Leg,
				type: sType
			}));
		}

		oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
			startDate: BeginDate,
			endDate: EndDate,
			type: sType,
			tooltip: comentario
		}));

		controller.dialogFragment.close();
		controller.dialogFragment.destroy(true);
	}
			
});
 function insertXS(data) {
	    
        var xsURL = "../../services/" +  "absenceDatesCollaborator.xsjs";
		
		var jsonData = [];

		jsonData.push({
		    absencesDatesID : 100,
			startDate: data.startDate,
			endDate: data.endDate,
			type: data.type,
			status: "forApproval",
			comment: data.comment,
			userID: '69'
		});


        var jsonData2 = {JSON_DATA: jsonData};
        $.ajax({
			    beforeSend: function(request) {
			        request.setRequestHeader("Content-Type", 'application/json');
			    },
			    type: "POST",
			    dataType: "json",
			    url: xsURL,
			    data: JSON.stringify(jsonData2),
			    async: false,
			    success: function(idata) {
                    console.log(idata);
                    debugger;
                    //insert data into model
                    var oData = sap.ui.getCore().getModel("absenceDatesCollaborator").getData();
                    oData.push(data);
                    //refresh model to update table values 
        			sap.ui.getCore().getModel("absenceDatesCollaborator").refresh();
			    }, error: function(error) {
			        console.log(error);
			    }
		     });
		     

	}
});
