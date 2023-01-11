defmodule Backend.Repo.Migrations.Prices do
  use Ecto.Migration

  def change do
    create table(:prices) do
      add :name, :string
      add :description, {:array, :string}
      add :price, :float
      timestamps()
    end
  end
end
