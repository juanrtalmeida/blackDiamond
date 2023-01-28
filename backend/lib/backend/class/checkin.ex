defmodule Backend.Class.Checkin do
  alias Backend.Models.{Checkin}
  alias Backend.Repo

  def call(params) do
    params
    |> Checkin.create_changeset()
    |> Repo.insert()
    |> handle_insert()
  end

  defp handle_insert({:ok, %Checkin{}} = result), do: result
  defp handle_insert({:error, _}), do: :error
end
