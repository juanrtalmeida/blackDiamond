defmodule Backend.Class.Create do
  alias Backend.Models.Class
  alias Backend.Repo

  def call(params) do
    params
    |> Class.create_changeset()
    |> Repo.insert()
    |> handle_insert()
  end

  defp handle_insert({:ok, %Class{}} = result), do: result
  defp handle_insert({:error, _}), do: :error
end
