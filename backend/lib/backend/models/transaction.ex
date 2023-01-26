defmodule Backend.Models.Transaction do
  use Ecto.Schema
  alias Backend.Models.User
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @timestamps_opts [type: :utc_datetime]

  schema "transactions" do
    belongs_to :user, User
    field :type, Ecto.Enum, values: [:entry, :exit]
    field :description, :string
    belongs_to :responsable, User
    has_many :items, Backend.Models.TransactionItem
    field :final_value, :float
    timestamps()
  end

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:user_id, :description, :responsable_id, :type])
    |> validate_required([:user_id, :type, :description, :responsable_id])
  end
end
