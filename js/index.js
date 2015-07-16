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
  }

  getUsers()
    .done(function (users) {
      users.forEach(function (user) {
        // console.log(tmpl.tweet({
        //   handle: user.handle, 
        //   img: user.img,
        //   message: user.realName
        // }))

        getTweets(user.id)
          .done(function (tweets) {
            tweets.forEach(function (tweet) {
              // console.log(tmpl.tweet({
              //   id: tweet.id,
              //   userId: tweet.userId,
              //   message: tweet.message
              // }))

        getReplies(tweet.id) 
          .done(function (replies) {
            replies.forEach(function (reply) {
              console.log('hi', tmpl.tweet({
                repliesId: reply.id
              }))
            })
          })
        })
      })
    })
  })

  $('#main').on('click', 'textarea', function () {
    $(this).parent().addClass('expand')
  })

  $('#main').on('submit', '.compose', function (event) {
    event.preventDefault()
    console.log($('textarea').val())
    
    $(this).removeClass('expand')

    var message = $(this).find('textarea').val()
    $('#tweets').append(message)

    $(this).find('textarea').val('')
    $(this).find('count').text(140)

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

  function renderCompose() {
    return tmpl.compose() 
  }

  function renderThread(handle, message, img) {
    var thread = tmpl.thread({
        tweet: renderTweet(handle, message, img),
        compose: renderCompose()
    })


  }

  function renderTweet() {
    var tweet = tmpl.tweet

  }



  
});