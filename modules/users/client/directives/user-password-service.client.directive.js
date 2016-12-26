'use strict';

angular.module('users').directive('passwordValidator', ['userPasswordService',
    function (userPasswordService) {//passwordValidator
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var selectScop;

                ngModel.$validators.requirements = function (password) {
                    var status = true;
                    if (password) {
                        var result = userPasswordService.getResult(password);
                        var requirementsIdx = 0;

                        // Requirements Meter - visual indicator for users
                        var requirementsMeter = [
                            { color: 'danger', progress: '20' },
                            { color: 'warning', progress: '40' },
                            { color: 'info', progress: '60' },
                            { color: 'primary', progress: '80' },
                            { color: 'success', progress: '100' }
                        ];

                        if (result.errors.length < requirementsMeter.length) {
                            requirementsIdx = requirementsMeter.length - result.errors.length - 1;
                        }

                        if(!selectScop){
                            selectScop = (scope.$parent.requirementsProgress === 0) ? scope.$parent : scope;
                        }
                        
                        selectScop.requirementsColor = requirementsMeter[requirementsIdx].color;
                        selectScop.requirementsProgress = requirementsMeter[requirementsIdx].progress;

                        if (result.errors.length) {
                            scope.popoverMsg = userPasswordService.getPopoverMsg();
                            scope.passwordErrors = result.errors;
                            status = false;
                        } else {
                            scope.popoverMsg = '';
                            scope.passwordErrors = [];
                            status = true;
                        }
                    }
                    return status;
                };
            }
        };
    }
]);
