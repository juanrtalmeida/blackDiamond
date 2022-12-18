defmodule Backend.Users.Login do
  alias Backend.{Repo, User}
  alias Ecto.{Changeset}

  def call(params) do
    changeset = params |> User.changeset_login()
    user = Repo.get_by!(User, email: Changeset.get_field(changeset, :email))

    case Pbkdf2.verify_pass(Changeset.get_field(changeset, :password), user.password) do
      true -> {:ok, user.email}
      _ -> {:fail}
    end
  end
end
