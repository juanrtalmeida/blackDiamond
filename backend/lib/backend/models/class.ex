defmodule Backend.Models.Class do
  use Ecto.Schema
  alias Backend.Models.User
  @timestamps_opts [type: :utc_datetime]
  schema "class" do
    field :name, :string
    field :description, :string
    field :creation_date, :date
    field :starting_hour, :float
    belongs_to :responsable, User
    field :type, :string
    many_to_many :students, User, join_through: "class_students"
    field :frequency, {:array, :string}
    timestamps()
  end
end
