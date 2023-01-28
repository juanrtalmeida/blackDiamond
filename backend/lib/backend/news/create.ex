defmodule Backend.News.Create do
  alias Backend.{Repo}
  alias Backend.Models.{News}

  def call(params, conn) do
    with {:ok, binary} <- File.read(params["image"].path) do
      file_name =
        handle_file_creation(
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

  defp handle_file_creation(filename, binary, false) do
    File.touch('priv/static/images/#{filename}')
    File.write('priv/static/images/#{filename}', binary)
    filename
  end

  defp handle_file_creation(filename, binary, true) do
    random_number = Enum.random(1..1_000_000)

    handle_file_creation(
      "#{random_number}" <> filename,
      binary,
      File.exists?('priv/static/images/#{random_number}#{filename}')
    )
  end

  defp handle_insert({:ok, %News{}} = result), do: result
  defp handle_insert({:error, result}), do: %{result: result, status: :bad_request}
end
