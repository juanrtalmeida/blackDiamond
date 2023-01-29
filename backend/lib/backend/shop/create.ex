defmodule Backend.Shop.Create do
  alias Backend.Models.{ShopItem}
  alias Backend.FileHandler
  alias Backend.Repo

  def call(params) do
    with {:ok, binary} <- File.read(params["image"].path) do
      file_name =
        FileHandler.handle_file_creation(
          params["image"].filename,
          binary,
          File.exists?('priv/static/images/#{params["image"].filename}')
        )

      params
      |> Map.delete("image")
      |> Map.put(
        "image",
        file_name
      )
      |> ShopItem.create_changeset()
      |> Repo.insert()
      |> handle_insert()
    else
      {:error, _} ->
        :error
    end
  end

  defp handle_insert({:ok, %ShopItem{}}), do: :ok
  defp handle_insert({:error, _}), do: :error
end
