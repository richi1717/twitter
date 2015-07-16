'use strict';

var $ = require('jquery')
var tmpl = require('./template.js')

var currentUser = {
  handle: '@darthkitty',
  img: '/images/darthkitty.jpg',
  id: 4
};

$(function () {
  var usersUrl = 'http://localhost:3000/users/'
  var tweetsUrl = 'http://localhost:3000/tweets/'
  var repliesUrl = 'http://localhost:3000/replies/'

  function getUsers() {
    return $.get(usersUrl)
  }

  var getUsers = getUsers()

  function getReplies(id) {
    return $.get(tweetsUrl + id + '/replies')
  }

  function getTweets(id) {
    return $.get(usersUrl + id + '/tweets') 
  }

  function renderCompose() {
    return tmpl.compose() 
  }




  getUsers.done(function (users) {
      users.forEach(function (user) {
        getTweets(user.id)
          .done(function (tweets) {
            tweets.forEach(function (tweet) {
              $('#tweets').append(renderThread({
                handle: user.handle, 
                img: '../images/' + user.img,
                message: tweet.message
              }))
              
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
              // $('#tweets').append(renderThread({
              //   repliesId: reply.id
              // }))
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
    var message = $(this).find('textarea').val()
    var replyTweet = $(this).closest('.replies')

    if(!!replyTweet.length) {
     replyTweet.append(renderTweet(currentUser, message)) 

    } else {
      $('#tweets').append(renderThread(currentUser, message))

    }



    
    $(this).removeClass('expand')

    $(this).find('textarea').val('')
    $(this).find('count').text(140)




  })

  $('#tweets').on('click', '.tweet', function () {
    $(this).closest('.thread').toggleClass('expand')
  })



  function renderThread(user, message, id) {
    var html = tmpl.thread({
        tweet: renderTweet(user, message, id),
        compose: renderCompose()
    })
    return html
  }

  function renderTweet(user, message, id) {
    var html = tmpl.tweet({
          img: user.img,
          handle: user.handle,
          message: user.message,
          id: id
        })
    return html
  }




  
});