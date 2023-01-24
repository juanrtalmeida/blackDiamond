defmodule Backend.Repo.Migrations.Transaction do
  use Ecto.Migration

  def change do
    create table(:transactions) do
      add :user_id, references(:users, type: :binary_id)
      add :amount, :integer
      add :type, :string
      add :description, :string
      add :date, :date
      add :responsable_id, references(:users, type: :binary_id)
      add :value, :float
      timestamps(type: :timestamptz)
    end

    create table(:monthly_payment) do
      add :user_id, references(:users, type: :binary_id)
      add :transaction_id, references(:transactions, type: :binary_id)
      add :date, :date
      timestamps(type: :timestamptz)
    end
  end
end
