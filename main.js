document.getElementById('issueInputForm').addEventListener('submit', saveissue);

var globalid = 0;

function saveissue(e){
  var issueDesc = document.getElementById('issueDescInput').value;
  var issuePriority = document.getElementById('issuePriorityInput').value;
  var issueDate = document.getElementById('issueDateInput').value;
  var issueId = globalid;
  globalid++;
  var issueStateus = 'Not done yet';

  var Issue = {
    id : issueId,
    Description : issueDesc,
    Priority : issuePriority,
    DoneDate : issueDate,
    status : issueStateus,
  }

  if(localStorage.getItem('Issues') == null){
    var Issues = [];
    Issues.push(Issue);
    localStorage.setItem('Issues', JSON.stringify(Issues));
  }else {
    var Issues = JSON.parse(localStorage.getItem('Issues'));
    Issues.push(Issue);
    localStorage.setItem('Issues', JSON.stringify(Issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

function deleteissue(id){
  var Issues = JSON.parse(localStorage.getItem('Issues'));

  for(var i = 0; i < Issues.length; i++){
    if(Issues[i].id == id){
      Issues.splice(i, 1);
    }
  }
  localStorage.setItem('Issues', JSON.stringify(Issues));

  fetchIssues();
}

function setstatus(id){
  var Issues = JSON.parse(localStorage.getItem('Issues'));

  for(var i = 0; i < Issues.length; i++){
    if(Issues[i].id == id){
      Issues[i].status = 'Done!';
    }
  }
  localStorage.setItem('Issues', JSON.stringify(Issues));

  fetchIssues();
}

function fetchIssues(){
  var Issues = JSON.parse(localStorage.getItem('Issues'));
  var Issuelist = document.getElementById('Issuelist');

  Issuelist.innerHTML = '';

  for(var i = 0; i < Issues.length; i++){
    var id = Issues[i].id;
    var desc = Issues[i].Description;
    var priority = Issues[i].Priority;
    var date = Issues[i].DoneDate;
    var status = Issues[i].status;

    Issuelist.innerHTML += '<div class = "well">'+
                           '<p><span class="label label-info">' + status + '</span></p>'+
                           '<h3>' + desc + '</h3>'+
                           '<p><span class="glyphicon glyphicon-exclamation-sign" style="margin-right:5px;"></span>' + priority + '</p>'+
                           '<p><span class = "glyphicon glyphicon-time" style="margin-right:5px;"></span>' + date + '</p>'+
                           '<a onclick = "setstatus(\''+id+'\')" class = "btn btn-success" style="margin-right:10px;">Done</a>'+
                           '<a href = "#" onclick = "deleteissue(\''+id+'\')" class = "btn btn-danger">Delete</a>'+
                           '</div>';
  }
}
