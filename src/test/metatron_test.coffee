metatron_file = require '../lib/metatron.js'
metatron = metatron_file.metatron

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

    it "should recognize websites with commas", () ->
      metatron.validateUrl("some.website.com/test,site/?qu,ery#test=as,a").should.be.true

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

    it "should convert a link containing commas to an href", () ->
      metatron.convertString({text: "http://thedailywtf.com/Articles/Remember,-Remember-the-ThirtyThird-of-November.aspx"}).should.eql("<a href='http://thedailywtf.com/Articles/Remember,-Remember-the-ThirtyThird-of-November.aspx' target=''>http://thedailywtf.com/Articles/Remember,-Remember-the-ThirtyThird-of-November.aspx</a>")

    it "should convert multiple links in a string to hrefs", () ->
      metatron.convertString({text: "This string contains 2 urls: youtube.com and http://amazon.com/login"}).should.eql("This string contains 2 urls: <a href='http://youtube.com' target=''>youtube.com</a> and <a href='http://amazon.com/login' target=''>http://amazon.com/login</a>")

    it "should convert multiple links in a string to hrefs with target set to _blank", () ->
      metatron.convertString({text: "This string contains 2 urls: youtube.com and http://amazon.com/login", target: "_blank"}).should.eql("This string contains 2 urls: <a href='http://youtube.com' target='_blank'>youtube.com</a> and <a href='http://amazon.com/login' target='_blank'>http://amazon.com/login</a>")

  describe 'Embed URL', () ->
    it "should be able to embed an instagram image", () ->
      metatron.convertString({text: "http://instagram.com/p/eSSk3xTISl/", embed: true}).should.eql('<iframe src="//instagram.com/p/eSSk3xTISl/embed/" width="400" height="498" frameborder="0" scrolling="no" allowtransparency="true"></iframe>')

    it "should be able to embed 2 instagram images", () ->
      metatron.convertString({text: "http://instagram.com/p/eSSk3xTISl/ and this here http://instagram.com/p/eSqC89zISo/", embed: true}).should.eql('<iframe src="//instagram.com/p/eSSk3xTISl/embed/" width="400" height="498" frameborder="0" scrolling="no" allowtransparency="true"></iframe> and this here <iframe src="//instagram.com/p/eSqC89zISo/embed/" width="400" height="498" frameborder="0" scrolling="no" allowtransparency="true"></iframe>')
