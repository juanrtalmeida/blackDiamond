defmodule BackendWeb.ShopView do
  use BackendWeb, :view

  def render("create_item.json", %{message: message}) do
    %{message: message}
  end

  def render("get_item.json", %{item: item}) do
    %{item: item}
  end
end
