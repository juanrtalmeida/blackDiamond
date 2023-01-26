defmodule Backend.Models.Warning do
  use Ecto.Schema
  alias Backend.Models.{User, Class}
  @timestamps_opts [type: :utc_datetime]
  schema "warnings" do
    belongs_to :author, User
    field :description, :string
    field :date, :date
    belongs_to :class, Class
    timestamps()
  end
end