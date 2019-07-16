$(function(){
  function buildHTML(message){
    var content = message.content_precence ? message.content : "" ;
    var img = message.image_precence ? `<img src="${message.image}">` : "" ;
    var html = `<div class="chat__messages__message">
                  <div class="chat__messages__message__upper">
                    <div class="chat__messages__message__upper__name">
                      ${message.name}
                    </div>
                    <div class="chat__messages__message__upper__date">
                      ${message.time}
                    </div>
                  </div>
                  <div class="chat__messages__message__lower">
                    ${content}
                  </div>
                  <div class="chat__messages__message__lower-image">
                    ${img}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data){
      var html = buildHTML(data);
      $('.chat__messages').append(html)
      $("#new_message")[0].reset();
      $('.chat__form__new-message__submit').removeAttr('disabled');
      $('.chat__messages').animate({ scrollTop: $('.chat__messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  })
})