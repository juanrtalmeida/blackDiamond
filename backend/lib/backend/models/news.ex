defmodule Backend.Models.News do
  alias Backend.Models.User
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @timestamps_opts [type: :utc_datetime]

  @required_params [
    :title,
    :description,
    :image_name,
    :author_id
  ]

  @derive {Jason.Encoder, only: @required_params ++ [:id]}
  schema "news" do
    field :title, :string
    field :description, :string
    field :image_name, :string
    belongs_to :author, User
    timestamps()
  end

  def changeset_create(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> validate_required(@required_params)
  end
end
