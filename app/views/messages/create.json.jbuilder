json.name @message.user.name
json.content @message.content
json.image @message.image.url
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content_presence @message.content.present?
json.image_presence @message.image.present?
json.id @message.id