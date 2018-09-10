function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function output(inp) {
  $('body').append("<pre>" + inp + "</pre>");
}

function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  json = json.replace(/[\{\},]/g, function (match) {
      return "<span class='array'>"+match+"</span>";
  });
  json = json.replace(/[\[\]]/g, function (match) {
      return "<span class='list'>"+match+"</span>";
  });
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }  
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      if (/(^"\w+":$)/.test(match)) {
          return '<span class="' + cls + '"><span class="array">\"</span>' + match.replace(/[":]/g, "") + '<span class="array">\":</span></span>'
      } else if (/(^"\w+"$)/.test(match)) {
          return '<span class="' + cls + '"><span class="array">\"</span>' + match.replace(/["]/g, "") + '<span class="array">\"</span></span>'
      } else {   
          return '<span class="' + cls + '">' + match + '</span>';
      }
  });
}

var address = [
];

address = sortByKey(people, 'label');
//alert(people[0].name);

var str = JSON.stringify(address, undefined, 4);
//output(str);
output(syntaxHighlight(str));