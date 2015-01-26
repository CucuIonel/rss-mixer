angular.module('rssApp', [])
  .controller('RssController', ['$scope', '$http', function($scope, $http){

    //create our variables so we can store the feeds and posts
    $scope.feeds = [];
    $scope.posts = [];
    $scope.addFeedInput = '';
    $scope.feedsJsonUrl = 'json/feeds.json';
    $scope.postsJsonUrl = 'json/posts.json';


    //make the GET request for the feeds JSON
    $http.get($scope.feedsJsonUrl)
    .success(function(data, status, headers, config) {
      if(data.response.status == 'OK')
      {
        $scope.feeds = data.response.result;
      }
      else
      {
        //if the status wasn't 'OK' let the user know about it
      }
    })
    .error(function(data, status, headers, config) {
    });


    //make the GET request for the posts JSON
    $http.get($scope.postsJsonUrl)
    .success(function(data, status, headers, config) {
      if(data.response.status == 'OK')
      {
        $scope.posts = data.response.result;
      }
      else
      {
        //if the status wasn't 'OK' let the user know about it
      }
    })
    .error(function(data, status, headers, config) {
    });


    /*
        function addFeed()
        Pushes a new feed into the feeds array list
    */

    $scope.addFeed = function(){

      //we'll push the new value if there is no empty string in the field
      if($scope.addFeedInput != '')
      {
        if(!$scope.feedExists($scope.addFeedInput))
        {
          //if the input's value is'nt in the feed array list, then push it to the array
          $scope.feeds.push(
          {
            name: $scope.addFeedInput
          });

          //clear the field after the value has beed pushed
          $scope.addFeedInput = '';
        }
        
      }
    };



    /*
        function removeFeed( index )
        Removes a feed from the feeds array list based on its index
    */

    $scope.removeFeed = function(index){
      //to remove a feed, just remove it from array
      //on a dynamic Back end it should make a DELETE request to feeds.json
      $scope.feeds.splice(index, 1);
    };



    /*
        function filterPosts( post )
        Used to filter the posts received based on the feed array list
    */

    $scope.filterPosts = function(post){

      var feedList = $scope.feeds;
      for(var i = 0; i < feedList.length; i++)
      {
        //if our post's source matches the feed name, it should show up in the page
        if(post.source == feedList[i].name)
        {
          return true;
        }
      }
      return false;
    }



    /*
        function feedExists( feed )
        Used to check if the feed exists in the feed array list
    */
    $scope.feedExists = function(feed){
      for(var i = 0; i < $scope.feeds.length; i++)
      {
        if(feed == $scope.feeds[i].name)
        {
          return true;
        }
      }
      return false;
    }
  }]);