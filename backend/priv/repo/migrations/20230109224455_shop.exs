defmodule Backend.Repo.Migrations.Shop do
  use Ecto.Migration

  def change do
    create table(:shop_item) do
      add :name, :string
      add :description, :text
      add :image, :string
      add :price, :float
      add :stock, :integer
      add :category, :string
      timestamps(type: :timestamptz)
    end
  end
end
