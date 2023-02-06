defmodule Backend.Models.Report do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Models.User

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  @timestamps_opts [type: :utc_datetime]

  schema "reports" do
    field :changes, {:array, :string}
    belongs_to :user, User
    field :type, :string
    field :model, :string
    timestamps()
  end

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:changes, :user_id, :model])
    |> validate_required([:changes, :user_id, :model])
  end
end
