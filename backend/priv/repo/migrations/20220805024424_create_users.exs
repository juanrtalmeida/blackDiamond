defmodule Backend.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :password, :string

      timestamps()
    end

    create unique_index(:users, [:email])

    alter table(:users) do
      add :validated, :boolean
      add :validation_number, :integer
    end
  end
end
