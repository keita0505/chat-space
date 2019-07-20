json.array! @messages do |message|
  json.content message.content
  json.content_presence message.content.present?
  json.image message.image.url
  json.image_presence message.image.present?
  json.time message.created_at.strftime("%Y/%m/%d %H:%M")
  json.name message.user.name
  json.id message.id
end
