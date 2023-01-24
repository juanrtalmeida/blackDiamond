defmodule Backend.Repo.Migrations.Class do
  use Ecto.Migration

  def change do
    create table(:class) do
      add :name, :string
      add :description, :string
      add :creation_date, :date
      add :starting_hour, :float
      add :responsable, references(:users, type: :binary_id, on_delete: :delete_all)
      add :type, :string
      add :frequency, {:array, :string}
      timestamps(type: :timestamptz)
    end

    create table(:class_students) do
      add :student_id, references(:users)
      add :class_id, references(:class)
      timestamps(type: :timestamptz)
    end

    create table(:warning) do
      add :author, references(:users, type: :binary_id, on_delete: :delete_all)
      add :description, :string
      add :date, :date
      timestamps(type: :timestamptz)
    end

    create table(:class_warnings) do
      add :warning_id, references(:warning)
      add :class_id, references(:class)
      timestamps(type: :timestamptz)
    end

    create table(:check_in) do
      add :student_id, references(:users)
      add :class_id, references(:class)
      add :date, :date
      timestamps(type: :timestamptz)
    end

    create table(:martial_arts) do
      add :name, :string
      timestamps(type: :timestamptz)
    end

    create unique_index(:martial_arts, [:name])
  end
end
