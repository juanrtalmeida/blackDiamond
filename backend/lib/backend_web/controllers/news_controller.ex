defmodule BackendWeb.NewsController do
  alias Backend.News.Create
  alias Backend.Models.News
  use BackendWeb, :controller
  import Plug.Conn
  alias Backend.Repo

  def create(conn, params) do
    with {:ok, news} <- Create.call(params, conn) do
      conn
      |> put_status(:created)
      |> render("create.json", news: news)
    else
      %{result: result, status: status} ->
        conn
        |> put_status(status)
        |> render("error.json", result: result)
    end
  end

  def get_photo(conn, params) do
    IO.inspect(params["path"])

    with {:ok, binary} <- File.read('priv/static/images/#{params["photo_name"]}') do
      extension = Path.extname(params["photo_name"])
      Io

      conn
      |> put_resp_header("content-type", "image/#{extension}")
      |> send_resp(200, binary)
    else
      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> render("error.json", result: "Photo not found")
    end
  end

  def get_all(conn, _) do
    news = Repo.all(News) |> Repo.preload(:author)

    conn
    |> put_status(:ok)
    |> render("get_all.json", news: news)
  end
end
