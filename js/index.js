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
  			console.log(tmpl.tweet({
  				handle: user.handle, 
  				img: user.img,
  				message: user.realName
  			}))
  			getTweets(user.id)
  				.done(function (tweets) {
  					tweets.forEach(function (tweet) {
  						console.log(tmpl.tweet({
  							id: tweet.id,
  							userId: tweet.userId,
  							message: tweet.message
  						}))
  					})
  					
  					console.log('tweets per user', tweets)
  				getReplies()

  				})



  			})
  	})

  function getReplies(id) {
  	return $.get(tweetsUrl + id + '/replies')
  		// .done(function (getRepliesFromTweetsUrl) {
  		// console.log('chris p', tweetsUrl + id + '/replies')
  			
  		// })
  }

  function getTweets(id) {
  	return $.get(usersUrl + id + '/tweets')	
  		// .done(function (getTweetsFromTweetsUrl) {
  		// 	console.log(getTweetsFromTweetsUrl)
  		// })
  }

 getReplies(2)



  
});


 //  function getUserTweets(users) {
 //      console.log('user data', users)
 //    users.forEach(function (user) {
 //      $.get(usersUrl + user.id + '/tweets')
 //          .done(function (tweets) {
 //            console.log('tweets for user ' + user.id, tweets)
 //          	tweets.forEach(function(tweet) {
 //      			$('#tweets').append(renderThread(user, tweet))
 //      			console.log('Tweet: ' + tweet);
 //      			})
 //          })
 //          .fail(function (xhr) {
 //            console.log(xhr.status, 'fail for user ' + user.id)
 //          })
 //      })
 //  }

 //  getUsers()
 //    .done(getUserTweets, function () {
 //    	console.log('user request tweet')
 //    })
 //    .fail(function (xhr) {
 //      console.log('users request failed', xhr.status)
 //    })

	// // $.get(tweetsUrl, {})
	// // 	.done(function (users) {
	// // 		console.log(users)
	// // 	})

	// $('#main').on('click', 'textarea', function () {
	// 	$(this).parent().addClass('expand')
	// })

	// $('#main').on('click', 'button', function (event) {
	// 	event.preventDefault()

	// 	var location = $(this).parents('.compose')
	// 	var message = location.find('textarea').val()
	// 	var replyTweet = $(this).parents('.replies')  
	// 	var output = renderThread(getUsers, message)

	// 	location.removeClass('expand')

	// 	if (!!replyTweet.length) {
	// 		output = renderTweet(user, message, id)
	// 		replyTweet.append(output)
	// 	} else {
	// 		$('#tweets').append(output)
	// 	}
	// 	location.find('textarea').val('')
	// 	location.find('.count').text(140)
	// 	console.log('holy fucking shit', output)
	// 	$('#tweets').append(renderTweet, 'holy shit')
	// })

	// $('.tweets').on('click', '.tweet', function () {
	// 	$(this).parent().toggleClass('expand')
	// 	console.log(this)
	// })

	// $('#main').on('keyup', 'textarea', function () {
	// 	var counter = $(this).parent().find('.count')
	// 	var value = $(this).val().length
	// 	counter.text(140 - value)
	// })

	// var renderTweet = function (user, tweet) {
	//     var output = tmpl.tweet({
	//     		img: user.img,
	//         handle: user.handle,
	//         message: tweet.message
	//         })
	//     return output
	//   }

	//   var renderThread = function (user, tweet) {
	//     var output = {
	//       tweet: renderTweet(user, tweet),
	//       compose: tmpl.compose()
	//     }

	//     return output
	//   }

	//    // function renderTweet(user, message, id) {
 //    //     var html = template.tweetTmpl({
 //    //                     id: id,
 //    //                     img: user.img,
 //    //                     handle: user.handle,
 //    //                     message: message
 //    //                 });

 //    //     return html;
 //    // }
	// // $.post('http://localhost:3000/users')

	// // $.get(baseUrl + '/posts')
	// //     .done(function (posts) {
	// //       console.log('post data', posts)
	// //     })
	// //     .fail(function (xhr) {
	// //       console.log(xhr.status, 'you really suck at getting posts')
	// //     })
	// //       // var baseUrl = 'http://jsonplaceholder.typicode.com'
	  

 //  // $('main').on('click', 'textarea', function () {
 //  //   $(this).parent().addClass('expand')
 //  // })

 //  // $('main').on('click', 'button', function (event) {
 //  //   event.preventDefault()

 //  //   var location = $(this).parents('.compose')
 //  //   var message = location.find('textarea').val()
 //  //   var replyTweet = $(this).parents('.replies')  
 //  //   var output = renderThread(user, message)

 //  //   location.removeClass('expand')

 //  //   if (!!replyTweet.length) {
 //  //     output = renderTweet(user, message)
 //  //     replyTweet.append(output)
 //  //   } else {
 //  //     $('.tweets').append(output)
 //  //   }
 //  //   location.find('textarea').val('')
 //  //   location.find('.count').text(140)
 //  // })

 //  // $('.tweets').on('click', '.tweet', function () {
 //  //   $(this).parent().toggleClass('expand')
 //  //   console.log(this)
 //  // })

 //  // $('main').on('keyup', 'textarea', function () {
 //  //   var counter = $(this).parent().find('.count')
 //  //   var value = $(this).val().length
 //  //   counter.text(140 - value)
 //  // })

// });
