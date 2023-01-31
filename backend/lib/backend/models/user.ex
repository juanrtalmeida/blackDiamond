defmodule Backend.Models.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Models.{Class, Checkin, MonthPayment}

  @primary_key {:id, :binary_id, autogenerate: true}

  @timestamps_opts [type: :utc_datetime]

  @required_params_professor [
    :email,
    :name,
    :cpf,
    :rg,
    :adress,
    :adress_number,
    :contact,
    :emergency_contact,
    :zip_code,
    :birth_date
  ]

  @required_params_user_creation @required_params_professor ++ [:password]

  @derive {Jason.Encoder, only: @required_params_professor ++ [:id] ++ [:password]}

  schema "users" do
    field :email, :string
    field :name, :string
    field :password, :string
    field :validated, :boolean
    field :validation_number, :integer
    field :privilages, Ecto.Enum, values: [:admin, :student, :owner, :professor]
    field :cpf, :string
    field :rg, :string
    field :adress, :string
    field :adress_number, :string
    field :adress_complement, :string
    field :contact, :string
    field :emergency_contact, :string
    has_many :month_payments, MonthPayment

    field :sex_orientation, Ecto.Enum,
      values: [:non_binary, :cis_man, :cis_woman, :trans_man, :trans_woman]

    field :zip_code, :string
    field :birth_date, :date
    field :active, :boolean
    field :expire_date_start, :integer
    field :expire_date_end, :integer
    many_to_many :classes, Class, join_through: "class_students"
    has_many :checkins, Checkin
    timestamps()
  end

  def changeset_validation(params) do
    %__MODULE__{}
    |> cast(params, [:validation_number])
    |> validate_required([:validation_number])
    |> validate_number(:validation_number, greater_than: 99999, less_than: 1_000_000)
  end

  def changeset_professor_creation(params) do
    %__MODULE__{}
    |> cast(params, @required_params_professor)
    |> validate_required(@required_params_professor)
    |> put_change(:privilages, :professor)
    |> put_change(:password, make_hash("12345678"))
    |> put_change(:validated, false)
    |> unique_constraint([:email, :cpf, :rg])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:name, min: 2)
    |> validate_format(:cpf, ~r/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
  end

  def changeset_login(params) do
    %__MODULE__{}
    |> cast(params, [:email, :password])
    |> validate_required([:email, :password])
  end

  def changeset_create(params) do
    %__MODULE__{}
    |> cast(params, @required_params_user_creation)
    |> handle_hash()
    |> validate_required(@required_params_user_creation)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:name, min: 2)
    |> put_change(:validated, false)
    |> put_change(:validation_number, Enum.random(100_000..999_999))
    |> unique_constraint([:email, :cpf, :rg])
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
