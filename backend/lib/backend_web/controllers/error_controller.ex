defmodule BackendWeb.ErrorController do
  use BackendWeb, :controller
  alias Phoenix.Controller

  def not_found(conn, _params) do
    conn
    |> put_status(:not_found)
    |> Controller.put_view(BackendWeb.ErrorView)
    |> Controller.render("404.json")
  end
end
