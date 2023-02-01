defmodule Backend.Models.Class do
  use Ecto.Schema
  alias Backend.Models.{User, Checkin, Warning}
  import Ecto.Changeset
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  @timestamps_opts [type: :utc_datetime]

  schema "class" do
    field :description, :string
    field :starting_hour, :float
    belongs_to :responsable, User
    field :type, :string
    many_to_many :students, User, join_through: "class_students"
    has_many :checkins, Checkin
    has_many :warns, Warning
    field :frequency, {:array, :string}
    timestamps()
  end

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:starting_hour, :description, :responsable_id, :type, :frequency])
    |> validate_required([:starting_hour, :description, :responsable_id, :type, :frequency])
  end

  def edit_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:starting_hour, :description, :responsable_id, :type, :frequency])
  end
end
