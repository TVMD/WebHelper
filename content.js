<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

document.body.innerHTML = "";

function addButton(name, cb) {
  var a = document.createElement("button");
  a.innerText = name;
  a.onclick = cb;
  document.body.appendChild(a);
}

function addInput(name,submit){
  var a =  document.createElement("input");
  a.onsubmit = submit;
  document.body.appendChild(a);
}

function addBreak(){
  document.body.appendChild(document.createElement("br"));
}

addInput("url",function(){
  var theValue = $(this).val();
    chrome.storage.sync.set({'url': theValue}, function() {
          // Notify that we saved.
          message('url saved');
        });
});

addBreak();

addButton("one",function(){
    chrome.storage.sync.get('url', function(url) {
          // Notify that we saved.
          message(url);
        });
});
