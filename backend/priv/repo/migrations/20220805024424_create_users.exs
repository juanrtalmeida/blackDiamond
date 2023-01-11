defmodule Backend.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :password, :string
      add :validated, :boolean
      add :validation_number, :integer
      add :privilages, :string
      add :cpf, :string
      add :rg, :string
      add :adress, :string
      add :adress_number, :string
      add :adress_complement, :string
      add :contact, :string
      add :emergency_contact, :string
      add :sex_orientation, :integer
      add :zip_code, :string
      add :birth_date, :date
      add :active, :boolean
      add :expire_date_start, :integer
      add :expire_date_end, :integer
      timestamps()
    end

    create unique_index(:users, [:email, :cpf, :rg])
  end
end
