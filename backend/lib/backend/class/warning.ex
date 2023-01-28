defmodule Backend.Class.Warning do
  alias Backend.Models.{Warning}
  alias Backend.Repo

  def call(params) do
    with {:ok, _} <- create_warning(params) do
      :ok
    else
      _ -> :error
    end
  end

  def create_warning(params) do
    Warning.create_changeset(params)
    |> Repo.insert()
    |> handle_insert()
  end

  defp handle_insert({:ok, %Warning{}} = result), do: result
  defp handle_insert({:error, _}), do: :error
end
