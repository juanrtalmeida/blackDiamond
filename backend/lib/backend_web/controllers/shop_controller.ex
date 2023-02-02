defmodule BackendWeb.ShopController do
  use BackendWeb, :controller
  alias Ecto.Changeset
  alias Backend.Shop.Create
  alias Backend.Models.ShopItem
  alias Phoenix.Controller
  alias Backend.Repo

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

  def get_products(conn, _) do
    conn
    |> put_status(:ok)
    |> render("get_products.json", products: Repo.all(ShopItem))
  end

  def change_item(conn, params) do
    class = Repo.get_by(Class, id: params["id"])

    change_params =
      Map.take(params, ["name", "description", "price", "stock"])
      |> Map.new(fn {k, v} -> {String.to_atom(k), v} end)

    Changeset.change(class, change_params)
    |> Repo.update()

    conn
    |> put_status(:ok)
    |> render("change_item.json", message: "Item alterado com sucesso")
  end
end
