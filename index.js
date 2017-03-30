"use strict";

var IncomingWebhook = require('@slack/client').IncomingWebhook;
var url = process.env.SLACK_WEBHOOK_URL || ''; //see section above on sensitive data
var webhook = new IncomingWebhook(url);

module.exports = (function() {
  function SpecReporter() {
    this.started = false;
    this.finished = false;
  }

  SpecReporter.prototype.jasmineStarted = function (suiteInfo) {
    this.started = true;
    // console.log('Running ' + suiteInfo.totalSpecsDefined + ' specs...');
    webhook.send('jasmineStarted');
  };

  SpecReporter.prototype.suiteStarted = function (result) {
    // console.log(result.description);
  };

  SpecReporter.prototype.specStarted = function (result) {
    // console.log(result.description);
  };

  SpecReporter.prototype.specDone = function (result) {
    // console.log(result.status);
  };

  SpecReporter.prototype.jasmineDone = function () {
    webhook.send('jasmineDone', function(err, res) {
      console.log(res);
    });

    console.log("jasmineDone");

    this.finished = true;
  };

  return SpecReporter;
}());
