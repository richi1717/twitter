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

  function getReplies(id) {
    return $.get(tweetsUrl + id + '/replies')
  }

  function getAllReplies() {
    return $.get(repliesUrl)
  }

  function getTweets() {
    return $.get(tweetsUrl) 
  }

  function tweetsByUser(id) {
    return $.get(usersUrl + id +'/tweets')
  }

  var renderCompose = tmpl.compose

  var replies = getAllReplies()
  var robots = getUsers()
  var tweeting = getTweets()

  robots.done(function (robotsData) {
    robotsData.forEach(function (robot) {
      tweetsByUser(robot.id)
        .done(function (tweets) {
          tweets.forEach(function (tweet) {
            $('#tweets').append(renderThread(robot, tweet.message, tweet.id))
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
    var twitterId = replyTweet.siblings('.tweet').attr('id')
    if (twitterId) {
      var tweetId = twitterId.split('-')[1]
    }


    if(!!replyTweet.length) {
      postReply(currentUser, tweetId, message)
    } else {
      postTweet(currentUser, message)
    }

    $(this).removeClass('expand')
    $(this).find('textarea').val('')
    $(this).find('count').text(140)
  }) 

  $('#tweets').on('click', '.tweet', function () {
    $(this).closest('.thread').toggleClass('expand')
    var appendReplies = $(this).parents('#tweets').find('.replies > .tweet')
    if (!appendReplies.length) {
      getAllReplies()
        .done(function (replies) {
          replies.forEach(function (reply) {
            robots.done(function (robotsData) {
              robotsData.forEach(function (robot) {
                if (reply.userId === robot.id) {
                  var html = renderTweet(robot, reply.message, reply.tweetId)
                  var search = $('#tweet-' + reply.tweetId).siblings('.replies')
                  search.append(html)
                }
              })
            })
          })
        })
    }
  })

  $('#main').on('keyup', 'textarea', function () {
    var counter = $(this).parent().find('.count')
    var value = $(this).val().length
    counter.text(140 - value)
  })

  function postTweet(user, message){
    $.post(tweetsUrl, {
      userId: user.id,
      message: message
    }).done(function (post) {
      console.log('Obviously you do not suck at life!')
      $('#tweets').append(renderThread(currentUser, message, post.id))
    }).fail(function () {
      console.log('Obviously you suck at life')
    })
  } 

  function postReply(user, tweetId, message){
    $.post(repliesUrl, {
      userId: user.id,
      tweetId: tweetId,
      message: message
    }).done(function (post) {
      console.log('fantastico!!!!')
      var html = tmpl.thread({
        tweet: renderTweet(user, message),
      })
      var search = $('#tweet-' + tweetId).siblings('.replies')
      search.append(html)
    }).fail(function () {
      console.log('if you\'re seeing this, I have probably jumped off of a building')
    })
  }

  function renderThread(user, message, id) {
    var html = tmpl.thread({
        tweet: renderTweet(user, message, id),
        compose: renderCompose
    })
    return html
  }

  function renderTweet(user, message, tweetId) {
    var html = tmpl.tweet({
          img: user.img,
          userId: user.id,
          handle: user.handle,
          message: message,
          id: tweetId
        })
    return html
  }
});