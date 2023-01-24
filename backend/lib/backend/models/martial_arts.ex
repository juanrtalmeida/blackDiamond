defmodule Backend.Models.MartialArts do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @timestamps_opts [type: :utc_datetime]
  schema "martial_arts" do
    field :name, :string
    timestamps()
  end

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:name])
    |> unique_constraint(:name)
    |> validate_required([:name])
  end
end
