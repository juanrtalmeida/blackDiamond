defmodule Backend.Models.Prices do
  use Ecto.Schema

  schema "prices" do
    field :name, :string
    field :description, {:array, :string}
    field :price, :float
    timestamps()
  end
end
