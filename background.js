// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Global variables only exist for the life of the page, so they get reset
// each time the page is unloaded.


var counter = 1;

var lastTabId = -1;

function sendMessage() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        lastTabId = tabs[0].id;
        chrome.tabs.sendMessage(lastTabId, "Background page started.");
    });
}

sendMessage();
chrome.browserAction.setBadgeText({
    text: ""
});
console.log("Loaded.");

chrome.runtime.onInstalled.addListener(function () {
    console.log("Installed.");

    // localStorage is persisted, so it's a good place to keep state that you
    // need to persist across page reloads.
    localStorage.counter = 1;

    // Register a webRequest rule to redirect bing to google.
    var wr = chrome.declarativeWebRequest;
    chrome.declarativeWebRequest.onRequest.addRules([{
        id: "0",
        conditions: [new wr.RequestMatcher({
            url: {
                hostSuffix: "bing.com"
            }
        })],
        actions: [new wr.RedirectRequest({
            redirectUrl: "http://google.com"
        })]
    }]);
});

chrome.commands.onCommand.addListener(function (command) {

    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url.indexOf("youtube.com") > -1
                || tabs[i].url.indexOf("soundcloud.com") > -1 
                || tabs[i].url.indexOf("deezer.com") > -1){
                if (command == "next" || command == "global_next" || command == "global_next2") {
                    chrome.tabs.executeScript(tabs[i].id, {
                        code: "document.querySelector('.ytp-next-button, .playControls__next, .icon-next').click();"
                    });
                }
                if (command == "pause" || command == "pause-global") {
                    chrome.tabs.executeScript(tabs[i].id, {
                        code: "document.querySelector('.ytp-play-button, .playControls__play ').click(); $('.play-hover').first().click();"
                    });
                }
            }
        }
    });
});

