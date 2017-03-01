$(function () {
    chrome.browserAction.setBadgeText({
        text: ""
    });

    chrome.tabs.getSelected(null, function (tab) {
        chrome.storage.sync.get('url', function (url) {
            var x = (url['url']);
            x = x.substring(0, x.indexOf("."));
            if (x == tab.url.substring(0,tab.url.indexOf("."))) {
                chrome.storage.sync.set({ 'url': tab.url }, function () {
                    chrome.browserAction.setBadgeText({
                        text: "K"
                    });
                    window.close();
                });
            }
        });
    });
    $("#one").on("click", function () {
        chrome.storage.sync.get('url', function (url) {
            var x = (url['url']);
            chrome.tabs.create({ url: x });
        });
    });

    $("#url").focus().focus(function () { $(this).select(); })
        .on('keyup', function (e) {
            if (e.keyCode == 13 || e.keyCode == 17) {
                var theValue = $(this).val();
                chrome.storage.sync.set({ 'url': theValue }, function () {
                    chrome.browserAction.setBadgeText({
                        text: "O"
                    });
                    window.close();
                });
            }
        });
});