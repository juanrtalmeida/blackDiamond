defmodule Backend.Models.Class do
  use Ecto.Schema
  alias Backend.Models.User

  schema "class" do
    field :name, :string
    field :description, :string
    field :creation_date, :date
    field :starting_hour, :float
    belongs_to :responsable, User
    field :type, :string
    has_many :students, User
    field :frequency, {:array, :string}
    timestamps()
  end
end
