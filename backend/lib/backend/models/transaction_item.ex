defmodule Backend.Models.TransactionItem do
  use Ecto.Schema
  alias Backend.Models.{Transaction}
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @timestamps_opts [type: :utc_datetime]

  schema "transaction_item" do
    belongs_to :transaction, Transaction
    field :name, :string
    field :quantity, :integer
    field :value, :float
    field :total_value, :float
    timestamps()
  end

  def create_item_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:transaction_id, :name, :quantity, :value])
    |> validate_required([:transaction_id, :name, :quantity, :value])
  end
end
