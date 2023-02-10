defmodule Backend.Users.Login do
  alias Backend.Repo
  alias Ecto.{Changeset}
  alias Backend.Models.User

  def call(params) do
    changeset = params |> User.changeset_login()

    with %User{} = user <- Repo.get_by!(User, email: Changeset.get_field(changeset, :email)) do
      case Pbkdf2.verify_pass(Changeset.get_field(changeset, :password), user.password) do
        true ->
          {:ok, user.email}

        _ ->
          {:fail}
      end
    else
      _ -> {:fail}
    end
  end
end
