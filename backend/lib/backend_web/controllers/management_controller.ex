defmodule BackendWeb.ManagementController do
  use BackendWeb, :controller
  alias Backend.Models.{MartialArts, Prices, Transaction, User, TransactionItem}
  alias Backend.Repo
  import Plug.Conn
  alias Phoenix.Controller
  import Ecto.Query
  import Ecto.Changeset

  def create(conn, params) do
    changeset = MartialArts.create_changeset(params)

    with {:ok, %MartialArts{}} <- Repo.insert(changeset) do
      conn
      |> put_status(:created)
      |> render("create.json", %{name: params["name"]})
    else
      {:error, _} ->
        conn
        |> put_status(:bad_request)
    end
  end

  def show(conn, _) do
    martial_arts = Repo.all(MartialArts)
    names = Enum.map(martial_arts, fn martial_art -> martial_art.name end)

    conn
    |> put_status(:ok)
    |> render("show.json", martial_arts: names)
  end

  def new_price(conn, params) do
    changeset = Prices.create_changeset(params)

    with {:ok, %Prices{}} <- Repo.insert(changeset) do
      conn
      |> put_status(:created)
      |> render("new_price.json", %{})
    else
      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> Controller.put_view(BackendWeb.ErrorView)
        |> Controller.render("400.json")
    end
  end

  def show_prices(conn, _) do
    prices = Repo.all(Prices)

    enum =
      Enum.map(prices, fn price ->
        %{
          name: price.name,
          description: price.description,
          price: price.price,
          id: price.id
        }
      end)

    conn
    |> put_status(:ok)
    |> render("show_prices.json", prices: enum)
  end

  def delete_price(conn, params) do
    with %Prices{} = price <- Repo.get(Prices, params["id"]) do
      Repo.delete(price)

      conn
      |> put_status(:ok)
      |> render("delete_price.json", %{})
    else
      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> Controller.put_view(BackendWeb.ErrorView)
        |> Controller.render("400.json")
    end
  end

  def new_transaction(conn, params) do
    changeset =
      Transaction.create_changeset(
        params
        |> Map.put("responsable_id", Repo.get_by(User, email: conn.assigns.email).id)
      )

    with {:ok, changeset_validated} <- search_for_prices(changeset, params),
         {:ok, %Transaction{} = result} <- Repo.insert(changeset_validated),
         {:ok} <- handle_items_inserction(params, result.id) do
      conn
      |> put_status(:created)
      |> render("new_transaction.json", %{})
    else
      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> Controller.put_view(BackendWeb.ErrorView)
        |> Controller.render("400.json")
    end
  end

  def get_transactions(conn, params) do
    with {:ok, _} <- Date.from_iso8601(params["starting_date"]),
         {:ok, _} <- Date.from_iso8601(params["ending_date"]) do
      {_, starting_date, _} =
        DateTime.from_iso8601(params["starting_date"] <> "T00:00:00,00+03:00")

      {_, ending_date, _} = DateTime.from_iso8601(params["ending_date"] <> "T23:59:59+03:00")

      query =
        from t in Transaction,
          where:
            t.inserted_at >= ^(starting_date |> DateTime.add(3, :hour)) and
              t.inserted_at <= ^(ending_date |> DateTime.add(3, :hour))

      transactions =
        Repo.all(query)
        |> Repo.preload(:user)
        |> Repo.preload(:responsable)
        |> Repo.preload(:items)

      enum =
        Enum.map(transactions, fn transaction ->
          %{
            id: transaction.id,
            user_id: transaction.user_id,
            user_name: transaction.user.name,
            type: transaction.type,
            items:
              transaction.items
              |> Enum.map(fn item ->
                %{
                  name: item.name,
                  quantity: item.quantity,
                  value: item.value,
                  total_value: item.total_value
                }
              end),
            final_value: transaction.final_value,
            description: transaction.description,
            responsable_id: transaction.responsable_id,
            responsable_name: transaction.responsable.name,
            date: transaction.inserted_at |> DateTime.add(-3, :hour) |> DateTime.to_string()
          }
        end)

      conn
      |> put_status(:ok)
      |> render("get_transactions.json", transactions: enum)
    else
      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> Controller.put_view(BackendWeb.ErrorView)
        |> Controller.render("400.json")
    end
  end

  defp handle_items_inserction(params, id) do
    items_changesets =
      Enum.map(params["items"], fn item ->
        TransactionItem.create_item_changeset(item |> Map.put("transaction_id", id))
      end)

    case Enum.any?(items_changesets, fn item_changeset -> !item_changeset.valid? end) do
      true ->
        {:error, "Invalid changeset"}

      false ->
        items_changesets =
          Enum.map(items_changesets, fn changeset ->
            put_change(
              changeset,
              :total_value,
              get_change(changeset, :value) * get_change(changeset, :quantity)
            )
          end)

        inserction_result = Enum.map(items_changesets, fn changeset -> Repo.insert(changeset) end)
        handle_repo_result(inserction_result)
    end
  end

  defp handle_repo_result(results) do
    case Enum.any?(results, fn result ->
           {code, _} = result
           code == :error
         end) do
      true ->
        {:error, "Problem inserting items"}

      false ->
        {:ok}
    end
  end

  defp search_for_prices(changeset, params) do
    case params["items"] do
      :undefined ->
        {:error, "No items"}

      nil ->
        {:error, "No items"}

      [] ->
        {:error, "No items"}

      _ ->
        if(
          Enum.any?(params["items"], fn item ->
            item["value"] == nil || (item["value"] == :undefined && item["quantity"] == nil) ||
              item["quantity"] == :undefined || !is_number(item["value"]) ||
              !is_number(item["quantity"])
          end)
        ) do
          {:error, "No value and quantity"}
        end

        changeset =
          put_change(
            changeset,
            :final_value,
            Enum.reduce(params["items"], 0, fn item, acc ->
              acc + item["value"] * item["quantity"]
            end)
          )

        {:ok, changeset}
    end
  end
end
