defmodule Backend.Models.Transaction do
  use Ecto.Schema
  alias Backend.Models.User

  schema "transaction" do
    field :user_id, :binary_id
    field :amount, :integer
    field :type, :string
    field :description, :string
    field :date, :date
    belongs_to :responsable, User
    field :value, :float
    timestamps()
  end
end
