defmodule Backend.Models.MonthPayment do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  @timestamps_opts [type: :utc_datetime]

  schema "month_payment" do
    field :value, :float
    field :paid, :boolean
    field :month, :string
    field :year, :string
    belongs_to :user, Backend.Models.User
    timestamps()
  end

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:paid, :month, :year, :user_id])
    |> validate_required([:user_id, :paid, :month, :year])
  end
end
