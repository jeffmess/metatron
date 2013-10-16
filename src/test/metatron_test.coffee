'use strict'

metatron = require '../lib/metatron.js'

describe 'Metatron', ()->
  describe '#of()', ()->

    it 'fetch', ()->
      metatron.fetch("youtube.com").should.eql('youtube.com')

  describe 'Validate URL', () ->

    it 'should validate normal text to false', ()->
      metatron.validateUrl("agsjdhgajshdgjh").should.be.false

    it 'should validate url: to false', ()->
      metatron.validateUrl("url:").should.be.false

    it 'should recognise http websites', () ->
      metatron.validateUrl("http://youtube.com").should.be.true

    it 'should recognise other protocol websites', () ->
      metatron.validateUrl("s3://amazon.com").should.be.true
      metatron.validateUrl("icmp://example.com").should.be.true
      metatron.validateUrl("smb://example.com").should.be.true

    it 'should recognise websites without http', () ->
      metatron.validateUrl("youtube.com").should.be.true

    it 'should recognise subdomains', () ->
      metatron.validateUrl("www.youtube.com").should.be.true

    it "should recognize websites with ports", () ->
      metatron.validateUrl("some.website.with.ports:3000").should.be.true

    it "should recognize websites with a path", () ->
      metatron.validateUrl("some.website.com/deep/nested/path/with.xml").should.be.true

    it "should recognize websites with a query string", () ->
      metatron.validateUrl("some.website.com/test/query/string?params=1&version=2").should.be.true

    it "should recognize websites with js fragments", () ->
      metatron.validateUrl("some.website.com/test/query/string#blah").should.be.true

#    it "should recognize websites with nested js fragments", () ->
#      metatron.validateUrl("some.website.com/test/query/string#blah/blah/blah").should.be.true

  describe 'Fetch URL from string', () ->

    it "should return true if a url exists", () ->
      metatron.stringContainsUrl("This string contains a url: youtube.com, woot!").should.be.true

    it "should return false if no url exists", () ->
      metatron.stringContainsUrl("This string does not contain a url").should.be.false

  describe 'Convert URLs in a string to hrefs', () ->

    it "should convert a link in a string to and href", () ->
      metatron.convertString({text: "This string contains a url: youtube.com"}).should.eql("This string contains a url: <a href='http://youtube.com' target=''>youtube.com</a>")

    it "should convert multiple links in a string to hrefs", () ->
      metatron.convertString({text: "This string contains 2 urls: youtube.com and http://amazon.com/login"}).should.eql("This string contains 2 urls: <a href='http://youtube.com' target=''>youtube.com</a> and <a href='http://amazon.com/login' target=''>http://amazon.com/login</a>")

    it "should convert multiple links in a string to hrefs with target set to _blank", () ->
      metatron.convertString({text: "This string contains 2 urls: youtube.com and http://amazon.com/login", target: "_blank"}).should.eql("This string contains 2 urls: <a href='http://youtube.com' target='_blank'>youtube.com</a> and <a href='http://amazon.com/login' target='_blank'>http://amazon.com/login</a>")
