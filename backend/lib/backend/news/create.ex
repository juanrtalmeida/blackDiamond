defmodule Backend.News.Create do
  alias Backend.{Repo}
  alias Backend.Models.{News}
  alias Backend.FileHandler

  def call(params, conn) do
    with {:ok, binary} <- File.read(params["image"].path) do
      file_name =
        FileHandler.handle_file_creation(
          params["image"].filename,
          binary,
          File.exists?('priv/static/images/#{params["image"].filename}')
        )

      params
      |> Map.put(
        :author_id,
        conn.assigns[:user_info].id
      )
      |> Map.put(:image_name, file_name)
      |> Map.put(:title, params["title"])
      |> Map.put(:description, params["description"])
      |> Map.delete("description")
      |> Map.delete("title")
      |> Map.delete("image")
      |> News.changeset_create()
      |> Repo.insert()
      |> handle_insert()
    else
      {:error, _} ->
        IO.inspect("error")
    end
  end

  defp handle_insert({:ok, %News{}} = result), do: result
  defp handle_insert({:error, result}), do: %{result: result, status: :bad_request}
end
