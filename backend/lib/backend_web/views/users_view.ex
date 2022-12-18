defmodule BackendWeb.UsersView do
  use BackendWeb, :view

  def render("create.json", %{user: user}),
    do: %{message: "User created successfully", user: %{name: user.name, email: user.email}}

  def render("login.json", _), do: ''

  def render("password_wrong.json", _), do: %{message: "Password is wrong"}

  def render("infos.json", %{user: user}), do: %{email: user.email, name: user.name}

  def render("validation_accepted.json", _), do: %{message: "Email validation accepted"}

  def render("validation_fail.json", _), do: %{message: "Email validation unaccepted"}
end
