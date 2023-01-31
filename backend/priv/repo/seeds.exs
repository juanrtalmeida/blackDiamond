# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
alias Backend.{Repo}
alias Backend.Models.{User}

[
  %{
    name: "Juan Almeida",
    email: "juanalgal2@gmail.com",
    privileges: :admin,
    password: "12345678"
  },
  %{
    name: "Samuel Paiva",
    email: "spsouzablack@yahoo.com.br",
    privileges: :owner,
    password: "12345678"
  }
]
|> Enum.each(fn user ->
  Repo.insert!(User.changeset_create_admin(user, user.privileges))
end)

# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Backend.Repo.insert!(%Backend.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
