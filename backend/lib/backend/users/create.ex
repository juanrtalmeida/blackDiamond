defmodule Backend.Users.Create do
  alias Backend.{Repo, User}

  def call(params) do
    params
    |> User.changeset_create()
    |> Repo.insert()
    |> handle_insert()
  end

  defp handle_insert({:ok, %User{}} = result), do: result
  defp handle_insert({:error, result}), do: %{result: result, status: :bad_request}
end
