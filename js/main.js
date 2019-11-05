$(document).ready(function(){

  $("#searchUser").on('keyup', function(e){
    let username = e.target.value;

    //make request to Github
    $.ajax({
      url: 'https://api.github.com/users/'+username,
      data: {
        client_id: '07b1075d687dca866b0f',
        client_secret: '74b31d320352a8ec515a39f922df021f577d36d4'
      }
    }).done(function(user){

      $.ajax({
        url: 'https://api.github.com/users/'+username+'/repos',
        data: {
          client_id: '07b1075d687dca866b0f',
          client_secret: '74b31d320352a8ec515a39f922df021f577d36d4',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $("#repos").append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-primary">Forks: ${user.forks_count}</span>
                  <span class="badge badge-info">Watchers: ${user.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${user.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-primary"> Repo Page </a>
                </div>
              </div>
            </div>
            `);
        });
      });
      $("#profile").html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target = "_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-info">Public Gists: ${user.public_gits}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge-danger">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/Blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.createdAt}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>

        `);
    });

  });




});
