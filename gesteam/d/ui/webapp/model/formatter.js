jQuery.sap.declare("POCAIRE.model.formatter");

POCAIRE.model.formatter = { 
   getFirstName: function(absenceDatesCollaborator){
	    return absenceDatesCollaborator[0].firstName;
	},
	getLastName: function(absenceDatesCollaborator){
	    return absenceDatesCollaborator[0].lastName;
	},
	getHolidays: function(absenceDatesCollaborator){
	    return absenceDatesCollaborator[0].totalHolidays;                      
	},
	getCompensation: function(absenceDatesCollaborator){
	    return absenceDatesCollaborator[0].compensation;
	}
};