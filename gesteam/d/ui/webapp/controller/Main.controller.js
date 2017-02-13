sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/m/Popover',
	'sap/m/Button'
], function(jQuery, Controller, Popover, Button) {
	"use strict";
	var previous_button;
	var target_button;
	var app; 
	var targetFrag, targetView, targetCtrl;
    
	var Controller = Controller.extend("POCAIRE.controller.Main", {

		onInit: function() {
			app = this.getView().byId("app");
			previous_button = "home";
			target_button = "home";

			var oUser = {
				user: { 
					info: {
						firstName: "Maria",
						lastName: "Batatas",
						id: 2,
						lastLogin: new Date(),
						level: "Team Lead",
						//	role: "collaborator"
						role: "supervisor"
					},
					teamMembers: [{
						info: {
							id: 1,
							name: "João Couves",
							level: "Analyst",
							ext: "EXT",
							local: "Amoreiras"
						},
						absences: {
							totalHolidays: 22,
							compensation: 12,
							balance: 2,
							currentDateInterval: "",
							currentComment: "",
							absenceDates: [{
								id: "VAC1",
								startDate: new Date("2017", "07", "24"),
								endDate: new Date("2017", "07", "30"),
								type: "vacationDay",
								/* vacationDay, holiday, training */
								status: "approved",
								/* forApproval, approved, notApproved */
								comment: "FERIAS"
							}]
						},
						assignments: [{
							projectId: "P007",
							projectName: "BOND",
							startDate: new Date("2017", "00", "2"),
							endDate: new Date("2017", "03", "24"),
							status: "VIVO"
						}]
					}, {
						info: {
							id: 2,
							name: "Manuel Nabo",
							level: "Analyst",
							ext: "EXT",
							local: "Braga"
						},
						absences: {
							totalHolidays: 22,
							compensation: 12,
							balance: 2,
							currentDateInterval: "",
							currentComment: "",
							absenceDates: [{
									id: "VAC2",
									startDate: new Date("2017", "06", "14"),
									endDate: new Date("2017", "06", "20"),
									type: "VacationDay",
									/* vacationDay, holiday, training */
									status: "forApproval",
									/* forApproval, approved, notApproved */
									comment: "FERIAS"
							},
								{
									id: "VAC3",
									startDate: new Date("2017", "06", "14"),
									endDate: new Date("2017", "06", "20"),
									type: "Training",
									/* vacationDay, holiday, training */
									status: "forApproval",
									/* forApproval, approved, notApproved */
									comment: "FERIAS"
							}]
						},
						assignments: [{
							projectId: "P0001",
							projectName: "POCAIRE",
							startDate: new Date("2017", "00", "23"),
							endDate: new Date("2017", "01", "08"),
							status: "MORTO"
						}]
					}, {
						info: {
							id: 3,
							name: "Joana Alface",
							level: "Intern",
							ext: "EXT",
							local: "Amoreiras"
						},
						absences: {
							totalHolidays: 22,
							compensation: 12,
							balance: 10,
							currentDateInterval: "",
							currentComment: "",
							absenceDates: [{
								id: "TR001",
								startDate: new Date("2017", "01", "24"),
								endDate: new Date("2017", "01", "26"),
								type: "Training",
								/* vacationDay, holiday, training */
								status: "Approved",
								/* forApproval, approved, notApproved */
								comment: "TREINO"
							}]
						},
						assignments: [{
							projectId: "P008",
							projectName: "POCAE",
							startDate: new Date("2017", "02", "24"),
							endDate: new Date("2017", "03", "24"),
							status: "Por saber"
						}]
					}],
					resourcesAssignement: [{
							project: "P007",
							assignments: [{
								assignee: "Joao Couves",
								startDate: new Date("2017", "01", "1"),
								endDate: new Date("2017", "01", "4")
							}, {
								assignee: "Manuel Nabo",
								startDate: new Date("2017", "01", "6"),
								endDate: new Date("2017", "01", "10")
							}, {
								assignee: "Joao Couves",
								startDate: new Date("2017", "01", "6"),
								endDate: new Date("2017", "01", "11")
							}, {
								assignee: "Joana Alface",
								startDate: new Date("2017", "01", "6"),
								endDate: new Date("2017", "01", "10")
							}]

						},

						{
							project: "P008",
							assignments: [{
								assignee: "Manuel Nabo",
								startDate: new Date("2017", "01", "14"),
								endDate: new Date("2017", "01", "16")
							}, {
								assignee: "Joana Alface",
								startDate: new Date("2017", "01", "13"),
								endDate: new Date("2017", "01", "15")
							}, {
								assignee: "Joao Couves",
								startDate: new Date("2017", "01", "6"),
								endDate: new Date("2017", "01", "9")
							}]
						}, {
							project: "P010",
							assignments: [{
								assignee: "Joana Alface",
								startDate: new Date("2017", "01", "6"),
								endDate: new Date("2017", "01", "10")
							}]

						}
					],

					projects: [{
						idProject: "P007",
						nameProject: "BOND",
						idWbs: "BND000"
					}, {
						idProject: "P008",
						nameProject: "POCAIRE",
						idWbs: "BND111"
					}, {
						idProject: "P009",
						nameProject: "POCAE",
						idWbs: "BND222"
					}],

					// *********************************************************
					// MODIFICATIONs HERE
					// *********************************************************

					hoursManagementDay: [{
						ticketResource: "Vodafone",
						time: [{
							startDate: new Date("2017", "01", "3", "00"),
							endDate: new Date("2017", "01", "3", "23"),
							sumTime: "15 horas"
						}, {
							startDate: new Date("2017", "01", "6", "00"),
							endDate: new Date("2017", "01", "6", "23"),
							sumTime: "9 horas"
						}]
					}, {
						ticketResource: "Vodafone",
						time: [{
							startDate: new Date("2017", "01", "7", "00"),
							endDate: new Date("2017", "01", "7", "23"),
							sumTime: "5 horas"
						}]
					}],

					hoursManagement15: [{
						ticketResource: "MEO",
						time: [{
							startDate: new Date("2017", "01", "1", "00"),
							endDate: new Date("2017", "01", "13", "23"),
							sumTime: "15 horas"
						}, {
							startDate: new Date("2017", "01", "15", "00"),
							endDate: new Date("2017", "01", "28", "23"),
							sumTime: "9 horas"
						}]
					}, {
						ticketResource: "MEO",
						time: [{
							startDate: new Date("2017", "02", "1", "00"),
							endDate: new Date("2017", "02", "13", "23"),
							sumTime: "5 horas"
						}]
					}],

					hoursManagementMonth: [{
						ticketResource: "MEO",
						time: [{
							startDate: new Date("2017", "01", "1", "00"),
							endDate: new Date("2017", "01", "28", "23"),
							sumTime: "24 horas"
						}]
					}, {
						ticketResource: "MEO",
						time: [{
							startDate: new Date("2017", "02", "1", "00"),
							endDate: new Date("2017", "02", "31", "23"),
							sumTime: "5 horas"
						}]
					}]

				}
			};

			// *********************************************************
			// MODIFICATIONs HERE
			// *********************************************************

			var oModel = new sap.ui.model.json.JSONModel(oUser);

			this.getView().setModel(oModel, "oUser");
			sap.ui.getCore().setModel(oModel, "oUser");

			var oModelToGetView = new sap.ui.model.json.JSONModel();
			oModelToGetView.setProperty("/viewController", this);
			sap.ui.getCore().setModel(oModelToGetView, "oViewController");

			this.getXS("WBS.xsjs");
			this.getXSodata("view_gestao.xsodata/gestaoRecursos2View");
			this.getXS("gestao_recursos1.xsjs");
			this.getXS("absencesDates.xsjs");
			this.getXS("absenceDatesCollaborator.xsjs");
			//this.getXSodata("gestao_horas_res.xsodata/CalculationView");
			this.getXS("gestao_horas.xsjs");

		},
		editHeader: function(event) {
			var text = event.getSource().getText();
			var label = this.getView().byId('labelbotao');

			if (event.getSource().getId() !== this.getView().createId("home")) {
				label.setText(text);
			} else {
				label.setText("");
			}
		},

		//change button style when clicked
		changeBtnStyle: function(id) {

			previous_button = target_button;
			target_button = id;
			this.getView().byId(target_button).setType("Emphasized");
			this.getView().byId(previous_button).setType("Default");

		},

		//Navigate fragments
		changePage: function(frag_id, name_ctrl, name_view) {

			//if is the same fragment go to the same
			if (app.getPage(targetFrag) !== null) {
				//change to frag
				app.to(targetFrag);
			} else { //go to targetfragment

				//initiate controller
				var oController = new sap.ui.controller("POCAIRE.controller." + name_ctrl);
				//associate fragment to controller
				var newPage = new sap.ui.xmlfragment("POCAIRE.fragment." + name_view, oController);

				this.getView().addDependent(newPage);
				//add page to the app box 
				app.addPage(newPage);
				//change to frag
				app.to(frag_id);
				//start 
				oController.onInit();
			}
		},

		// --------------------------------------------------------------------------------------------------
		// ----------------------------------------Button Handlers-------------------------------------------
		// --------------------------------------------------------------------------------------------------

		onPressHome: function(event) {
			this.editHeader(event);
			app.to(this.getView().createId("homepage"));
			this.changeBtnStyle("home");
		},

		onPressAbsence: function(event) {
			this.editHeader(event);

			//change style 
			this.changeBtnStyle("ausencias"); //buttonID

			switch (sap.ui.getCore().getModel("oUser").getData().user.info.role) {
				case "supervisor":
					targetFrag = "gestaoAusencias"; //fragID
					targetView = "GestaoAusencias";
					targetCtrl = "GestaoAusencias";
					break;
				case "collaborator":
					//navigate to target fragment
					targetFrag = "gestaoAusencias"; //fragID
					targetView = "GestaoAusencias";
					targetCtrl = "GestaoAusencias";
					break;
			}
			this.changePage(targetFrag, targetView, targetCtrl); //pageid, view_name,ctrl_name

		},

		onPressResources: function(event) {
			this.editHeader(event);
			this.changeBtnStyle("recursos"); //buttonID

			// targetFrag = "resources"; //fragID
			// targetView = "GestaoRecursos";
			// targetCtrl = "GestaoRecursos";

			targetFrag = "resources"; //fragID
			targetView = "GestaoRecursos";
			targetCtrl = "GestaoRecursos";

			this.changePage(targetFrag, targetView, targetCtrl); //pageid, view_name,ctrl_name

		},

		onPressHours: function(event) {
			this.editHeader(event);
			this.changeBtnStyle("horas");

			targetFrag = "resourcesman";
			targetView = "hour_man";
			targetCtrl = "hour_man";

			this.changePage(targetFrag, targetView, targetCtrl); //pageid, view_name,ctrl_name

		},

		onPressWBS: function(event) {
			this.editHeader(event);
			this.changeBtnStyle("wbs");

			switch (sap.ui.getCore().getModel("oUser").getData().user.info.role) {
				case "supervisor":
					targetFrag = "team_wbs";
					targetView = "team_wbs";
					targetCtrl = "team_wbs";
					break;
				case "collaborator":
					targetFrag = "user_wbs";
					targetView = "user_wbs";
					targetCtrl = "user_wbs";
					break;
			}

			this.changePage(targetFrag, targetView, targetCtrl); //pageid, view_name,ctrl_name

		},

		onPressUploadExcel: function(event) {
			this.editHeader(event);
			this.changeBtnStyle("excel");

			targetFrag = "upload";
			targetView = "upload";
			targetCtrl = "upload";

			this.changePage(targetFrag, targetView, targetCtrl); //pageid, view_name,ctrl_name

		},

		onPressConfigurations: function(event) {
		    
			this.editHeader(event);
			this.changeBtnStyle("configuracoes");

			targetFrag = "planningcalendar"; //fragID
			targetView = "PlanningCalendar";
			targetCtrl = "PlanningCalendar";

			this.changePage(targetFrag, targetView, targetCtrl); //pageid, view_name,ctrl_name


		},

		onPressLogout: function(event) {
			this.editHeader(event);
			this.changeBtnStyle("logout");
		},

		getXS: function(xsName) {
			var xsURL = "../../services/" + xsName;
			var model;
			$.ajax({
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", 'application/json');
				},
				type: "GET",
				dataType: "json",
				url: xsURL,
				async: false,
				success: function(data) {
					console.log(data);
					model = data;
				},
				error: function(error) {
					console.log(error);
				}
			});

			var oSQL = new sap.ui.model.json.JSONModel(model);
			var modelName = xsName.split(".")[0];

			this.getView().setModel(oSQL, modelName);
			sap.ui.getCore().setModel(oSQL, modelName);

		},
		
		getXSodata: function(xsodataName) {
			var xsURL = "../../services/" + xsodataName; 
			var model;
			$.ajax({
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", 'application/json');
				},
				type: "GET",
				dataType: "json",
				url: xsURL,
				async: false,
				success: function(data1) {
					console.log(data1.d.results);
					model = data1.d.results;
				},
				error: function(error) {
					console.log(error);
				}
			});

			var oSQL = new sap.ui.model.json.JSONModel(model);
			var modelName = xsodataName.split(".")[0];

			this.getView().setModel(oSQL, modelName);
			sap.ui.getCore().setModel(oSQL, modelName);

		}
		
	});

	return Controller;

});