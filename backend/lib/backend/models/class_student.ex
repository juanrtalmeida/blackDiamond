defmodule Backend.Models.ClassStudent do
  use Ecto.Schema
  alias Backend.Models.{User, Class}

  import Ecto.Changeset
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @timestamps_opts [type: :utc_datetime]

  schema "class_students" do
    belongs_to :user, User
    belongs_to :class, Class
    timestamps()
  end

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:user_id, :class_id])
    |> validate_required([:user_id, :class_id])
  end
end
