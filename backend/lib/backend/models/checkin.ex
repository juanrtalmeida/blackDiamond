defmodule Backend.Models.Checkin do
  use Ecto.Schema
  alias Backend.Models.{User}
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  @timestamps_opts [type: :utc_datetime]

  schema "checkin" do
    belongs_to :user, User
    belongs_to :class, Backend.Models.Class
    timestamps()
  end

  def create_changeset(params) do
    %__MODULE__{}
    |> cast(params, [:user_id, :class_id])
    |> validate_required([:user_id, :class_id])
  end
end
