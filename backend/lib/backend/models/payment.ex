defmodule Backend.Models.Payment do
  use Ecto.Schema
  alias Backend.Models.{User}

  schema "payments" do
    belongs_to :user, User
    belongs_to :responsable, User
    field :value, :float
    field :date, :date
    field :type, :string
    timestamps()
  end
end
