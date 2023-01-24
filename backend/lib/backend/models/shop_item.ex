defmodule Backend.Models.ShopItem do
  use Ecto.Schema
  @timestamps_opts [type: :utc_datetime]
  schema "shop_item" do
    field :name, :string
    field :description, :string
    field :image, :string
    field :price, :float
    field :stock, :integer
    field :category, :string
    timestamps()
  end
end
