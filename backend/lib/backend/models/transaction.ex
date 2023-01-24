defmodule Backend.Models.Transaction do
  use Ecto.Schema
  alias Backend.Models.User
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @timestamps_opts [type: :utc_datetime]
  schema "transactions" do
    belongs_to :user, User
    field :amount, :integer
    field :type, Ecto.Enum, values: [:entry, :exit]
    field :description, :string
    field :date, :date
    belongs_to :responsable, User
    field :value, :float
    timestamps()
  end

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:user_id, :amount, :type, :description, :date, :value, :responsable_id])
    |> validate_required([:user_id, :amount, :type, :description, :date, :value, :responsable_id])
  end
end
