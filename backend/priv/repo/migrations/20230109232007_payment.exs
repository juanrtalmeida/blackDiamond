defmodule Backend.Repo.Migrations.Payment do
  use Ecto.Migration

  def change do
    create table(:payments) do
      add :user_id, references(:users, type: :binary_id)
      add :type, :string
      add :date, :date
      add :responsable, references(:users, type: :binary_id)
      add :value, :float
      timestamps()
    end

    create table(:payment_students) do
      add :payment_id, references(:payments)
      add :student_id, references(:users)
    end
  end
end
