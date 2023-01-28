defmodule Backend.Models.Warning do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Models.{User, Class}

  @timestamps_opts [type: :utc_datetime]
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  schema "warning" do
    belongs_to :user, User
    field :title, :string
    field :description, :string
    belongs_to :class, Class
    timestamps()
  end

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:user_id, :description, :title, :class_id])
    |> validate_required([:user_id, :title, :description, :class_id])
  end
end
