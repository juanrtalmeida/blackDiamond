defmodule Backend.Repo.Migrations.Transaction do
  use Ecto.Migration

  def change do
    create table(:transactions) do
      add :user_id, references(:users, type: :binary_id)
      add :type, :string
      add :description, :text
      add :responsable_id, references(:users, type: :binary_id)
      add :final_value, :float
      timestamps(type: :timestamptz)
    end

    create table(:transaction_item) do
      add :transaction_id, references(:transactions, type: :binary_id)
      add :quantity, :integer
      add :name, :string
      add :value, :float
      add :total_value, :float
      timestamps(type: :timestamptz)
    end
  end
end
