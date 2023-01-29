defmodule BackendWeb.ShopController do
  use BackendWeb, :controller
  alias Backend.Shop.Create
  alias Phoenix.Controller

  def create_item(conn, params) do
    with :ok <- Create.call(params) do
      conn
      |> put_status(:created)
      |> render("create_item.json", message: "Item criado com sucesso")
    else
      :error ->
        conn
        |> put_status(:bad_request)
        |> Controller.put_view(BackendWeb.ErrorView)
        |> Controller.render("400.json")
    end
  end
end
