defmodule Backend.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}

  @required_params [:email, :name, :password]

  @derive {Jason.Encoder, only: @required_params ++ [:id]}

  schema "users" do
    field :email, :string
    field :name, :string
    field :password, :string
    field :validated, :boolean
    field :validation_number, :integer

    timestamps()
  end

  def changeset_validation(params) do
    %__MODULE__{}
    |> cast(params, [:validation_number])
    |> validate_required([:validation_number])
    |> validate_number(:validation_number, greater_than: 99999, less_than: 1_000_000)
  end

  def changeset_login(params) do
    %__MODULE__{}
    |> cast(params, [:email, :password])
    |> validate_required([:email, :password])
  end

  def changeset_create(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> handle_hash()
    |> validate_required(@required_params)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:name, min: 2)
    |> put_change(:validated, false)
    |> put_change(:validation_number, Enum.random(100_000..999_999))
    |> unique_constraint([:email])
  end

  defp handle_hash(changeset) do
    case password =
           changeset
           |> get_field(:password) do
      "" -> changeset
      nil -> changeset
      _ -> changeset |> put_change(:password, make_hash(password))
    end
  end

  defp make_hash(password) do
    Pbkdf2.add_hash(password) |> Map.get(:password_hash)
  end
end
