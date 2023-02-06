defmodule Backend.Repo.Migrations.News do
  use Ecto.Migration

  def change do
    create table(:news) do
      add :title, :string
      add :description, :text
      add :image_name, :string
      add :author_id, references(:users, type: :binary_id)
      timestamps(type: :timestamptz)
    end
  end
end
