'use strict';

var $ = require('jquery')
var tmpl = require('./template.js')

var currentUser = {
  handle: '@darthkitty',
  img: 'darthkitty.jpg',
  id: 4
};

$(function () {
	var usersUrl = 'http://localhost:3000/users/'
	var tweetsUrl = 'http://localhost:3000/tweets/'
	var repliesUrl = 'http://localhost:3000/replies/'

	function getUsers() {
    return $.get(usersUrl)
    	// .done(function (getUsersFromUserUrl) {
    	// 	console.log(getUsersFromUserUrl)
    	// })
  }

  getUsers()
  	.done(function (users) {
  		users.forEach(function (user) {
  			getTweets(user.id)
  				.done(function (tweets) {
  					tweets.forEach(function (tweet) {
  						console.log(tmpl.tweet({tweetid: tweet.id}))
  						
  					})
  					console.log('tweets per user', tweets)
  				})
  		})
  	})

  function getTweets(id) {
  	return $.get(usersUrl + id + '/tweets')	
  		// .done(function (getTweetsFromTweetsUrl) {
  		// 	console.log(getTweetsFromTweetsUrl)
  		// })
  }

  
});

