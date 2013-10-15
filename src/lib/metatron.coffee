###

metatron
https://github.com/jeffmess/metatron

Copyright (c) 2013 Jeffrey van Aswegen
Licensed under the MIT license.

###

'use strict'

# metatron.fetch(url)

exports.fetch = (url) ->
  # future method to fetch meta data from a website
  # {
  #   url: 'http://www.youtube.com/watch?v=Veg63B8ofnQ',
  #   title: 'Kitty Corliss "Grinding the Crack"'
  #   description: '...'
  #   images: [
  #
  #   ]
  # }
  url

exports.pattern = ->
  '(([a-zA-Z0-9]+:\\/\\/)?'+ # protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ # domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ # OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ # port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ # query string
  '(\\#[-a-z\\d_]*)?)'

exports.validateUrl = (url) ->
  regex = new RegExp("^#{@pattern()}$", 'gi')
  return false unless regex.test(url)
  true

exports.stringContainsUrl = (str) ->
  # checks if string contains a url
  regex = new RegExp(@pattern(), 'gi')
  return false unless regex.test(str)
  true

exports.convertWord = (word, target="") ->
  return word unless @stringContainsUrl(word)
  "<a href='#{word}' target='#{target}'>#{word}</a>"

exports.convertString = (options={}) ->
  # returns the string with href tags
  throw new Error("Required: options.text does not exist.") unless options.text?
  return options.text unless @stringContainsUrl(options.text)
  options.target = "" unless options.target?
  str = (@convertWord word, options.target for word in options.text.split(" "))
  str.join(" ")
