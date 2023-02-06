defmodule Backend.Repo.Migrations.Class do
  use Ecto.Migration

  def change do
    create table(:class) do
      add :description, :text
      add :starting_hour, :float
      add :responsable_id, references(:users, type: :binary_id, on_delete: :delete_all)
      add :type, :string
      add :frequency, {:array, :string}
      timestamps(type: :timestamptz)
    end

    create table(:class_students) do
      add :user_id, references(:users)
      add :class_id, references(:class)
      timestamps(type: :timestamptz)
    end

    create table(:warning) do
      add :user_id, references(:users, type: :binary_id, on_delete: :delete_all)
      add :class_id, references(:class, type: :binary_id, on_delete: :delete_all)
      add :description, :text
      add :title, :string
      timestamps(type: :timestamptz)
    end

    create table(:check_in) do
      add :student_id, references(:users)
      add :class_id, references(:class)
      timestamps(type: :timestamptz)
    end

    create table(:martial_arts) do
      add :name, :string
      timestamps(type: :timestamptz)
    end

    create unique_index(:martial_arts, [:name])
  end
end
