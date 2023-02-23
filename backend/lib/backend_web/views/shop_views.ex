defmodule BackendWeb.ShopView do
  use BackendWeb, :view

  def render("create_item.json", %{message: message}) do
    %{message: message}
  end

  def render("change_item.json", %{message: _message}), do: ""
  def render("delete_item.json", %{message: _message}), do: []

  def render("get_products.json", %{products: item}) do
    %{
      items:
        Enum.map(item, fn item ->
          %{
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            quantity: item.stock
          }
        end)
    }
  end
end
