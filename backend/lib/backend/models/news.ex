defmodule Backend.Models.News do
  alias Backend.Models.User
  use Ecto.Schema
  import Ecto.Changeset

  @required_params [
    :title,
    :description,
    :date,
    :image,
    :author
  ]

  schema "news" do
    field :title, :string
    field :description, :string
    field :date, :date
    field :image, :string
    belongs_to :author, User
  end

  def changeset_create(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> validate_required(@required_params)
  end
end
