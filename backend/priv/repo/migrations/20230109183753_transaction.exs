defmodule Backend.Repo.Migrations.Transaction do
  use Ecto.Migration

  def change do
    create table(:transactions) do
      add :user_id, references(:users, type: :binary_id)
      add :amount, :integer
      add :type, :string
      add :description, :string
      add :date, :date
      add :responsable, references(:users, type: :binary_id)
      add :value, :float
      timestamps()
    end
  end
end
