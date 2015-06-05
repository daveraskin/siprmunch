angular.module('filters', []).filter('postFilter', function($scope) {
  return function(input) {
    var returnedPosts = [];
    if($scope.type === 'coffee'){
      if(input.type === 'Coffee'){
        returnedPosts.push(input)
      }
    }
    if($scope.type === 'drink'){
      if(input.type === 'Drink'){
        returnedPosts.push(input)
      }
    }
    if($scope.type === 'bite'){
      if(input.type === 'Bite'){
        returnedPosts.push(input)
      }
    }
    if($scope.type === 'meal'){
      if(input.type === 'Meal'){
        returnedPosts.push(input)
      }
    }
    return returnedPosts
  };
});