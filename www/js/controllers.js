angular.module('starter.controllers', [])

.controller('SettingsCtrl', function($scope, $ionicModal) {

})

.controller('TimeCtrl', function($scope, $ionicModal, $cordovaDatePicker) {

    $scope.items = [];

    $scope.myTimeIn = new Date().setHours(8,0,0,0);
    $scope.myTimeOut = new Date().setHours(17,0,0,0);
    $scope.myBreak = 0;

    $scope.editTimeIn = function(){
        var options = {
            date: new Date(),
            mode: 'time'
        };
        options.date.setHours(8, 0, 0,0);
        $cordovaDatePicker.show(options).then(function(date) {
            $scope.myTimeIn = date;
            $scope.myTimeIn.setSeconds(0);
        });
    };
    $scope.editTimeOut = function(){
        var options = {
            date: new Date(),
            mode: 'time'
        };
        options.date.setHours(17, 0, 0,0);
        $cordovaDatePicker.show(options).then(function(date) {
            $scope.myTimeOut = date;
            $scope.myTimeOut.setSeconds(0);
        });
    };

    var timeoutId = null;

    $scope.$watch('myBreak.time', function() {


        console.log('Has changed');

        if (timeoutId !== null) {
            console.log('Ignoring this movement');
            return;
        }

        console.log('Not going to ignore this one');
        timeoutId = $timeout(function () {

            console.log('It changed recently!');

            $timeout.cancel(timeoutId);
            timeoutId = null;

            // Now load data from server
        }, 1000);
    });

            $scope.delete = function(item){
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.edit = function(item){
        alert(item.time);
    };

    $ionicModal.fromTemplateUrl('modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

    $scope.addTime = function() {
        $scope.myTimeIn = null;
        $scope.myTimeOut = null;
        $scope.myBreak = {'time' : '0'};
        $scope.modal.show();
    };
    $scope.closeModal = function(val) {
        if(val == 1){
            //add time
            var timeworked = ($scope.myTimeOut.valueOf() - $scope.myTimeIn.valueOf()) / 3600000.0;
            if($scope.myBreak.time > 0){
                timeworked = timeworked - ($scope.myBreak.time.valueOf() / 60.0);
            }
            //alert("Timeworked:" + timeworked);
            //alert("myBreak: " + $scope.myBreak.time);
            $scope.items.push({time: timeworked.toFixed(2)});
        }
        else{
            //cancel
        }
        $scope.modal.hide();

    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
});
