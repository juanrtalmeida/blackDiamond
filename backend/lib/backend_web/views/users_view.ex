defmodule BackendWeb.UsersView do
  use BackendWeb, :view

  def render("create.json", %{user: user}),
    do: %{message: "User created successfully", user: %{name: user.name, email: user.email}}

  def render("login.json", _), do: ''

  def render("password_wrong.json", _), do: %{message: "Password is wrong"}

  def render("infos.json", %{user: user}),
    do: %{
      email: user.email,
      name: user.name,
      birth_date: user.birth_date,
      id: user.id,
      privileges: user.privilages,
      cpf: user.cpf,
      rg: user.rg,
      adress_number: user.adress_number,
      adress: user.adress,
      contact: user.contact,
      emergency_contact: user.emergency_contact,
      zip_code: user.zip_code,
      expire_date_start: user.expire_date_start,
      expire_date_end: user.expire_date_end,
      checkins:
        Enum.map(user.checkins, fn checkin ->
          %{
            type: checkin.class.type,
            date:
              NaiveDateTime.to_string(
                checkin.inserted_at
                |> DateTime.add(-3, :hour)
                |> DateTime.to_naive()
              )
          }
        end),
      classes:
        Enum.map(user.classes, fn class -> %{type: class.type, frequency: class.frequency} end)
    }

  def render("validation_accepted.json", _), do: %{message: "Email validation accepted"}

  def render("validation_fail.json", _), do: %{message: "Email validation unaccepted"}
end
