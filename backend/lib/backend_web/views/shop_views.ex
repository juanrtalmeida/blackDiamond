defmodule BackendWeb.ShopView do
  use BackendWeb, :view

  def render("create_item.json", %{message: message}) do
    %{message: message}
  end

  def render("get_products.json", %{products: item}) do
    %{
      item:
        Enum.map(item, fn item ->
          %{
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image
          }
        end)
    }
  end
end
