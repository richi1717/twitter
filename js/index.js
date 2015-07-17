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

  function getAllReplies() {
    return $.get(repliesUrl)
  }

  function getTweets(id) {
    return $.get(usersUrl + id + '/tweets') 
  }

  function renderCompose() {
    return tmpl.compose() 
  }

  function reply(replies) {
    replies.forEach(function (reply) {
      $.get(usersUrl + reply.userId)
    })
  }

getAllReplies()
  .done(function (replies) {
    reply(replies)
  })

  getUsers.done(function (users) {
      users.forEach(function (user) {
        getTweets(user.id)
          .done(function (tweets) {

              console.log(user, 'sense????????')

            console.log('hey', tweets)
            tweets.forEach(function (tweet) {
              console.log('get tweet', tweet)
              $('#tweets').append(renderThread(user, tweet.message, tweet.id))

              // console.log(tmpl.tweet({
              //   id: tweet.id,
              //   userId: tweet.userId,
              //   message: tweet.message
              // })) 

        getReplies(tweet.id) 
          .done(function (replies) {
            console.log(tweet.id, 'kjasdfljasdf')
            replies.forEach(function (reply) {
              $('#tweets').append(renderThread(user, reply.message, tweet.id))

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
     console.log(message)

    } else {
      $('#tweets').append(renderThread(currentUser, message))
      console.log(message)

    }

    $(this).removeClass('expand')

    $(this).find('textarea').val('')
    $(this).find('count').text(140)

  })

  //   $('#tweets').on('click', '.tweet', function () {
  //     $(this).closest('.thread').toggleClass('expand')
  //     var appendReplies = $(this).siblings('.replies').children('.tweet')
  //     if (!!appendReplies.length) {
  //       getReplies().done(function (replies) {
  //         console.log('yes')
  //         $('.replies').append(replies)
  //       })
  //     } else {
  //       console.log('nope')
  //     }
  // })




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
          message: message,
          id: id,
          // userId: user.id
        })
    console.log('heyheyejeheyeye',user)
    return html
  }

 


  
});