defmodule Backend.Models.ShopItem do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
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

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:name, :description, :image, :price, :stock, :category])
    |> validate_required([:name, :description, :image, :price, :stock, :category])
  end
end
