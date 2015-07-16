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
      //  console.log(getUsersFromUserUrl)
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
      //  console.log(getTweetsFromTweetsUrl)
      // })
  }

 getReplies(2)



  
});