/**
 * @author a.demeshko
 * created on 12/29/15
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.mail')
        .service('mailMessages', mailMessages);

    /** @ngInject */
    function mailMessages($sce,$http) {
        console.log('Stats.mail Service');
        
        var messages = [
			{
				"id": "4563faas0",
				"age": "28", 
				"position2": "", 
				"name": "Adrián Javier Bone S\u00e1nchez", 
				"placeOfBirth": "Esmeraldas, Ecuador", 
				"agent": "", 
				"lastTeam": "El Nacional", 
				"size": "1.88m", 
				"perfil2": "", 
				"dataSignin": "04/01/2017", 
				"position1": "Portero", 
				"ContractExpiration": "21/12/2017", 
				"date": "1988-08-08", 
				"perfil1": "Portero", 
				"number": "1",
				"tag": "ARQ",
				"labels": ['inbox'],
			},
			{ "id": "4563faas1","age": "20", "position2": "", "name": "Michael Steveen Estrada Mart\u00ednez", "placeOfBirth": "Guayaquil, Ecuador", "agent": "ProSoccer24", "lastTeam": "El Nacional", "size": "1.87m", "perfil2": "", "dataSignin": "05/01/2017", "position1": "Delantero", "ContractExpiration": "", "date": "1996-04-07", "perfil1": "Centro", "number": "7","tag": "DC","labels": ['inbox']},
			{ "id": "4563faas2","age": "21", "position2": "", "name": "Gabriel Jhon Cortez Casierra", "placeOfBirth": "Esmeraldas, Ecuador", "agent": "ProSoccer24", "lastTeam": "Formativas", "size": "1.79m", "perfil2": "", "dataSignin": "01/07/2012", "position1": "Medio campo", "ContractExpiration": "", "date": "1995-10-10", "perfil1": "Centro Ofensivo", "number": "10","tag": "MCO","labels": ['inbox']},
			{ "id": "4563faas3","age": "31", "position2": "", "name": "Mario Enrique Rizotto V\u00e1squez", "placeOfBirth": "Canelones, Uruguay", "agent": "", "lastTeam": "Atl\u00e9tico River Plate", "size": "1.64m", "perfil2": "", "dataSignin": "22/01/2013", "position1": "Medio campo", "ContractExpiration": "", "date": "1984-08-30", "perfil1": "Pivote", "number": "15","tag": "MC","labels": ['inbox']},
			{ "id": "4563faas4","age": "23", "position2": "", "name": "Luis Miguel Ayala Brucil", "placeOfBirth": "Ibarra, Ecuador", "agent": "", "lastTeam": "Macar\u00e1", "size": "1.71m", "perfil2": "", "dataSignin": "05/02/2013", "position1": "Defensa", "ContractExpiration": "", "date": "1993-09-24", "perfil1": "Lateral Izquierdo", "number": "6","tag": "DLI","labels": ['inbox']},
        ].sort(function (a, b) {
            if (a.date > b.date) return 1;
            if (a.date < b.date) return -1;
        }).reverse();
        
        var tabs = [{
            label: 'inbox',
            name: 'Inbox',
            newMails: 7
        }, {
            label: 'sent',
            name: 'Sent Mail'
        }, {
            label: 'important',
            name: 'Important'
        }, {
            label: 'draft',
            name: 'Draft',
            newMails: 2
        }, {
            label: 'spam',
            name: 'Spam'
        }, {
            label: 'trash',
            name: 'Trash'
        }];
        
        

        return {
            getMessagesByLabel: function (label) {
                return messages.filter(function (m) {
                    return m.labels.indexOf(label) != -1;
                });
            },
            getMessageById: function (id) {              
                return messages.filter(function (m) {
                    return m.id == id;
                })[0];
            }
        }

    }

})();
/*
$http({
  method: 'GET',
  url: '/teams/players/get'
})
.then(function successCallback(response) {
   console.log('PLAYERS: ',response.data);
    messages=response.data;
}, function errorCallback(response) {});
*/
