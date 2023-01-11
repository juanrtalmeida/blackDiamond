defmodule Backend.News.Create do
  alias Backend.{Repo}
  alias Backend.Models.News

  def call(params, conn) do
    IO.inspect(params["image"].path)

    with {:ok, binary} <- File.read(params["image"].path) do
      IO.inspect(binary)
      IO.inspect(Base.encode64(binary))
    else
      {:error, _} ->
        IO.inspect("error")
    end

    params
    |> News.changeset_create()
    |> Repo.insert()
    |> handle_insert()
  end

  defp handle_insert({:ok, %News{}} = result), do: result
  defp handle_insert({:error, result}), do: %{result: result, status: :bad_request}
end
