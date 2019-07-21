$(function(){
  var search_list = $("#user-search-result");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
    }
  
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  }

  $(function() {
    $("#user-search-field").on("input",function() {
      var input = $(this).val();
      var except_ids = "id != 0"
      $('.js-chat-member').each(function(){
        var except_id = $(this).data('id');
        except_ids += " and id != " + except_id
      })
      if (input.length == 0) {
        $("#user-search-result").empty();
        return
      }

      $.ajax({
        type: 'GET',
        url: '/users',
        data: {keyword: input, except_key: except_ids},
        dataType: 'json',
      })
      
      
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーはいません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
      
    });
  });
});

$(function() {
  function addUserHTML(user_name, user_id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8', data-id="${user_id}">
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html;
  };
  $(document).on("click", ".chat-group-user__btn--add", function () {
     
     var user_id = $(this).data('user-id')
     var user_name = $(this).data('user-name')
     $(this).parent().remove();
     var html = addUserHTML(user_name, user_id);
     $('#member_search_result').append(html)
  });
});  

$(function() {
  $(document).on("click", ".chat-group-user__btn--remove", function () {
     $(this).parent().remove();
  });
});  