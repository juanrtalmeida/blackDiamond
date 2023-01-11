defmodule Backend.Repo.Migrations.News do
  use Ecto.Migration

  def change do
    create table(:news) do
      add :title, :string
      add :description, :string
      add :date, :date
      add :image, :string
      add :author, references(:users, type: :binary_id)
      timestamps()
    end
  end
end
