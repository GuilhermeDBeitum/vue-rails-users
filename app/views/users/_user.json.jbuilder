json.extract! user, :id, :user, :email, :created_at, :updated_at
json.url user_url(user, format: :json)
