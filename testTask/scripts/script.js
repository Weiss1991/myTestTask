angular.module('testTask', [])

.controller('testCtrl', ['$scope', function ($scope) {

    $scope.mostWords = [];
    $scope.wordGroup = [];

    $scope.check = function (words) {

    	//first prepare our text
    	//remove punctuation
    	//and leave only words 2 letter and bigger
        $scope.words = words.replace(/[/.,!?;-]*/g, '')
        				  .toLowerCase()
        				  .split(' ')
        				  .filter(function (word) {

        						return word.length >= 2;
    					   });
        //then find groups of same words				  
        do{

        $scope.mostWords.push(groupSameWords($scope.words[0]));

    	}while($scope.words.length > 1);				  
       
        //leave only groups bigger than 1 word
        //and make array with objects
        //every object contains next info:
        //word and the its frequency
        $scope.mostWords = $scope.mostWords.filter(function(group){

        	return group.length > 1;
        }).forEach(function(group){

        	$scope.wordGroup.push(getCount(group));
        });
       
    }

    function groupSameWords(elem){

        //get group of same words
    	var sameWords = $scope.words.filter(function (word){

    						return word == elem;
    					});
        
        //and remove this word from main array
		$scope.words = $scope.words.filter(function(word){
		
		            		return word != elem;
						});
    	
    	return sameWords;
    }

    function getCount(group){

        //get group of same words
        //and count the frequency
    	return {

    		'word': group[0],
    		'count': group.length 
    	};

    }

    $scope.clear = function(){

      
    	$scope.mostWords = [];
    	$scope.wordGroup = [];
    	$scope.string = '';
    }

}]);