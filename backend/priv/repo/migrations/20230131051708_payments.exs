defmodule Backend.Repo.Migrations.Payments do
  use Ecto.Migration

  def change do
    create table(:month_payment) do
      add :user_id, references(:users, type: :binary_id)
      add :value, :float
      add :paid, :boolean
      add :month, :string
      add :year, :string
      timestamps(type: :timestamptz)
    end
  end
end
