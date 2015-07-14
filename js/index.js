'use strict';

var $ = require('jquery')
var tmpl = require('./template.js')

var currentUser = {
  handle: '@darthkitty',
  img: 'darthkitty.jpg',
  id: 1
};

$(function () {

	$('#main').on('click', 'textarea', function () {
		$(this).parent().addClass('expand')
	})

	$('#main').on('click', 'button', function (event) {
		event.preventDefault()

		var location = $(this).parents('.compose')
		var message = location.find('textarea').val()
		var replyTweet = $(this).parents('.replies')  
		var output = renderThread(user, message)

		location.removeClass('expand')

		if (!!replyTweet.length) {
			output = renderTweet(user, message)
			replyTweet.append(output)
		} else {
			$('.tweets').append(output)
		}
		location.find('textarea').val('')
		location.find('.count').text(140)
	})

	$('.tweets').on('click', '.tweet', function () {
		$(this).parent().toggleClass('expand')
		console.log(this)
	})

	$('main').on('keyup', 'textarea', function () {
		var counter = $(this).parent().find('.count')
		var value = $(this).val().length
		counter.text(140 - value)
	})

	$.post('localhost:3000/users')

});
