defmodule Backend.Models.Payment do
  use Ecto.Schema
  alias Backend.Models.{User}
  @timestamps_opts [type: :utc_datetime]
  schema "payments" do
    belongs_to :user, User
    belongs_to :responsable, User
    field :value, :float
    field :date, :date
    field :type, :string
    timestamps()
  end
end
