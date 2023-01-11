defmodule Backend.Repo.Migrations.Shop do
  use Ecto.Migration

  def change do
    create table(:shop_item) do
      add :name, :string
      add :description, :string
      add :image, :binary
      add :price, :float
      add :stock, :integer
      add :category, :string
      timestamps()
    end
  end
end
