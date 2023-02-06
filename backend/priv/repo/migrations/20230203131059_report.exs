defmodule Backend.Repo.Migrations.Report do
  use Ecto.Migration

  def change do
    create table(:reports) do
      add :type, :string
      add :changes, {:array, :string}
      add :user_id, references(:users, on_delete: :delete_all)
      add :model, :string
      timestamps()
    end
  end
end
