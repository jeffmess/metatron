(function() {
  var metatron, metatron_file;

  metatron_file = require('../lib/metatron.js');

  metatron = metatron_file.metatron;

  describe('Metatron', function() {
    describe('#of()', function() {
      return it('fetch', function() {
        return metatron.fetch("youtube.com").should.eql('youtube.com');
      });
    });
    describe('Validate URL', function() {
      it('should validate normal text to false', function() {
        return metatron.validateUrl("agsjdhgajshdgjh").should.be["false"];
      });
      it('should validate url: to false', function() {
        return metatron.validateUrl("url:").should.be["false"];
      });
      it('should recognise http websites', function() {
        return metatron.validateUrl("http://youtube.com").should.be["true"];
      });
      it('should recognise other protocol websites', function() {
        metatron.validateUrl("s3://amazon.com").should.be["true"];
        metatron.validateUrl("icmp://example.com").should.be["true"];
        return metatron.validateUrl("smb://example.com").should.be["true"];
      });
      it('should recognise websites without http', function() {
        return metatron.validateUrl("youtube.com").should.be["true"];
      });
      it('should recognise subdomains', function() {
        return metatron.validateUrl("www.youtube.com").should.be["true"];
      });
      it("should recognize websites with ports", function() {
        return metatron.validateUrl("some.website.with.ports:3000").should.be["true"];
      });
      it("should recognize websites with a path", function() {
        return metatron.validateUrl("some.website.com/deep/nested/path/with.xml").should.be["true"];
      });
      it("should recognize websites with a query string", function() {
        return metatron.validateUrl("some.website.com/test/query/string?params=1&version=2").should.be["true"];
      });
      return it("should recognize websites with js fragments", function() {
        return metatron.validateUrl("some.website.com/test/query/string#blah").should.be["true"];
      });
    });
    describe('Fetch URL from string', function() {
      it("should return true if a url exists", function() {
        return metatron.stringContainsUrl("This string contains a url: youtube.com, woot!").should.be["true"];
      });
      return it("should return false if no url exists", function() {
        return metatron.stringContainsUrl("This string does not contain a url").should.be["false"];
      });
    });
    return describe('Convert URLs in a string to hrefs', function() {
      it("should convert a link in a string to and href", function() {
        return metatron.convertString({
          text: "This string contains a url: youtube.com"
        }).should.eql("This string contains a url: <a href='http://youtube.com' target=''>youtube.com</a>");
      });
      it("should convert multiple links in a string to hrefs", function() {
        return metatron.convertString({
          text: "This string contains 2 urls: youtube.com and http://amazon.com/login"
        }).should.eql("This string contains 2 urls: <a href='http://youtube.com' target=''>youtube.com</a> and <a href='http://amazon.com/login' target=''>http://amazon.com/login</a>");
      });
      return it("should convert multiple links in a string to hrefs with target set to _blank", function() {
        return metatron.convertString({
          text: "This string contains 2 urls: youtube.com and http://amazon.com/login",
          target: "_blank"
        }).should.eql("This string contains 2 urls: <a href='http://youtube.com' target='_blank'>youtube.com</a> and <a href='http://amazon.com/login' target='_blank'>http://amazon.com/login</a>");
      });
    });
  });

}).call(this);
