defmodule Backend.Models.Prices do
  use Ecto.Schema
  import Ecto.Changeset
  @primary_key {:id, :binary_id, autogenerate: true}
  @timestamps_opts [type: :utc_datetime]
  schema "prices" do
    field :name, :string
    field :description, {:array, :string}
    field :price, :float
    timestamps()
  end

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:name, :description, :price])
    |> validate_required([:name, :description, :price])
    |> validate_length(:name, min: 3, max: 50)
    |> validate_array_length(:description, 3, 120)
    |> validate_number(:price, greater_than: 0)
  end

  defp validate_array_length(changeset, field, min, max) do
    valor =
      Enum.any?(get_field(changeset, field), fn e ->
        String.length(e) < min || String.length(e) > max
      end)

    if !valor do
      changeset
    else
      add_error(changeset, field, "Uma das descrições não está entre 3 e 120 caracteres")
    end
  end
end
