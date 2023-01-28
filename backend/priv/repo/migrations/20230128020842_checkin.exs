defmodule Backend.Repo.Migrations.Checkin do
  use Ecto.Migration

  def change do
    create table(:checkin) do
      add :user_id, references(:users, type: :binary_id)
      add :class_id, references(:class, type: :binary_id)
      timestamps()
    end
  end
end
