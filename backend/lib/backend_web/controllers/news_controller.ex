defmodule BackendWeb.NewsController do
  alias Backend.News.Create
  use BackendWeb, :controller
  import Plug.Conn

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
end
