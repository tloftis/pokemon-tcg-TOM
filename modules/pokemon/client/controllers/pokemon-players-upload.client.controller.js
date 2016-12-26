'use strict';

angular.module('pokemon').controller('pokemonPlayerUploadController', ['$scope', '$stateParams', '$state', 'toastr', 'pokemonPlayerService',
    function ($scope, $stateParams, $state, toastr, pokemonPlayerService) {
        var fileInput = document.getElementById('fileInput');
        var fileDisplayArea = document.getElementById('fileDisplayArea');
        var xmlData = '';

        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var textType = /xml.*/;

            if (file.type.match(textType)) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    xmlData = fileDisplayArea.innerText = reader.result;
                };

                reader.readAsText(file);
            } else {
                xmlData = '';
                fileDisplayArea.innerText = "File not supported!"
            }
        });

        $scope.uploadXML = function(){
            if(!xmlData){
                toastr.error('No XML data to upload!');
                return;
            }

            pokemonPlayerService.uploadPlayers(xmlData).then(function(){
                $state.go('pokemon.players.list');
            });
        };

        $scope.downloadXml = function(){
            downloadXML ('players.xml', genXml($scope.players));
        };

        function genXml(players){
            var xmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n\
                <!-- Players database. -->\n\
                <players>\n';

            players.forEach(function(player){
                xmlStr += '\
                <player userid="'+ player.pokeId +'">\n\
                    <firstname>'+ player.firstName +'</firstname>\n\
                    <lastname>'+ player.lastName +'</lastname>\n\
                    <birthdate>'+ moment(new Date(player.dob)).format('MM/DD/YYYY') +'</birthdate>\n\
                    <creationdate>'+ moment(new Date()).format('MM/DD/YYYY hh:mm:ss') +'</creationdate>\n\
                    <lastmodifieddate>'+ moment(new Date()).format('MM/DD/YYYY hh:mm:ss') +'</lastmodifieddate>\n\
                </player>\n';
            });

            xmlStr += '</players>';

            return xmlStr;
        }

        function downloadXML (filename, text) {
            var uint8Array = new Uint8Array(text.split('').map(function (c) {
                    return c.charCodeAt(0);
                })),
                blob = new Blob([uint8Array.buffer]),
                element = document.createElement('div');

            if (navigator.msSaveBlob) { //If IE >10
                navigator.msSaveBlob(blob, filename);
            } else { //Chrome/Firefox/almost anyone else
                element = document.createElement('a');
                element.setAttribute('href', URL.createObjectURL(blob));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        }
    }
]);
