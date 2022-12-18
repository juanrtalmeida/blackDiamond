defmodule Backend.Users.Validation do
  alias Backend.{Repo, User}
  alias Ecto.{Changeset}

  def call(params, email) do
    changeset = params |> User.changeset_validation()
    user = Repo.get_by!(User, email: email)

    case validate_number(user, Changeset.get_field(changeset, :validation_number)) do
      {:ok} ->
        Changeset.change(user, validated: true)
        |> Repo.update()

        {:ok}

      _ ->
        {:fail}
    end
  end

  defp validate_number(user, validation_number) do
    case user.validation_number == validation_number do
      true -> {:ok}
      _ -> {:fail}
    end
  end
end
